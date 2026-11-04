import { ArrowLeft, CreditCard, Info, MessageSquare } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MinimumOrderAlert } from '../components/order/MinimumOrderAlert';
import { OrderItemsList } from '../components/order/OrderItemsList';
import { OrderTotals } from '../components/order/OrderTotals';
import { ChoiceButton } from '../components/ui/ChoiceButton';
import { DeliveryTypeSelector } from '../components/ui/DeliveryTypeSelector';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { BAIRROS, RETIRADA_TEMPO_ESTIMADO_MIN } from '../data/delivery';
import { PIZZARIA_INFO } from '../data/pizzaria';
import { formatCurrency, formatPhone, onlyDigits } from '../lib/format';
import { getDeliveryFee, getMinimumOrderShortfall, getSubtotal } from '../lib/order';
import { buildOrderMessage, getWhatsappUrl } from '../lib/whatsapp';
import type { FormaPagamento } from '../types';

const PAYMENT_OPTIONS: { id: FormaPagamento; label: string; hint: string; badge: string; badgeClass: string }[] = [
  { id: 'pix', label: 'PIX', hint: 'Chave PIX no WhatsApp', badge: 'PX', badgeClass: 'bg-brand-red' },
  { id: 'dinheiro', label: 'Dinheiro', hint: 'Informe se precisa de troco', badge: 'R$', badgeClass: 'bg-brand-green' },
  { id: 'credito', label: 'Crédito', hint: 'Maquininha na entrega', badge: 'CR', badgeClass: 'bg-brand-dark' },
  { id: 'debito', label: 'Débito', hint: 'Maquininha na entrega', badge: 'DB', badgeClass: 'bg-brand-dark' },
];

type FieldName = 'nome' | 'telefone' | 'endereco' | 'numero' | 'trocoPara';
type FormErrors = Partial<Record<FieldName, string>>;

const fieldId = (name: FieldName) => `checkout-${name}`;

/** Aceita "50", "50,5" e "50.50". Retorna NaN para o que não for número. */
const parseMoney = (value: string): number => Number(value.trim().replace(',', '.'));

function FieldError({ name, errors }: { name: FieldName; errors: FormErrors }) {
  if (!errors[name]) return null;
  return (
    <p id={`${fieldId(name)}-erro`} className="mt-1 text-xs font-bold text-brand-red">
      {errors[name]}
    </p>
  );
}

export default function Checkout() {
  const { carrinho, clearCart, tipoEntrega, setTipoEntrega, bairro, setBairro } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const orderPlaced = useRef(false);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [referencia, setReferencia] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('pix');
  const [trocoPara, setTrocoPara] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Depois do envio o carrinho fica vazio, mas o destino correto é o acompanhamento.
  if (carrinho.length === 0 && !orderPlaced.current) {
    return <Navigate to="/cardapio" replace />;
  }

  const subtotal = getSubtotal(carrinho);
  const taxaEntrega = getDeliveryFee(tipoEntrega, bairro);
  const total = subtotal + taxaEntrega;
  const shortfall = getMinimumOrderShortfall(tipoEntrega, subtotal);
  const isDelivery = tipoEntrega === 'delivery';
  const pagaComTroco = formaPagamento === 'dinheiro' && trocoPara.trim() !== '';

  const fieldProps = (name: FieldName) => ({
    id: fieldId(name),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${fieldId(name)}-erro` : undefined,
    className: `field ${errors[name] ? 'border-brand-red' : ''}`,
  });

  const validate = (): boolean => {
    const next: FormErrors = {};
    const digitosTelefone = onlyDigits(telefone).length;

    if (!nome.trim()) next.nome = 'Informe seu nome.';
    if (digitosTelefone < 10 || digitosTelefone > 11) next.telefone = 'Informe um telefone com DDD.';
    if (isDelivery && !endereco.trim()) next.endereco = 'Informe o endereço.';
    if (isDelivery && !numero.trim()) next.numero = 'Informe o número.';
    if (pagaComTroco) {
      const valor = parseMoney(trocoPara);
      if (Number.isNaN(valor) || valor <= total) {
        next.trocoPara = `O valor deve ser maior que o total de ${formatCurrency(total)}.`;
      }
    }

    setErrors(next);
    const firstInvalid = Object.keys(next)[0] as FieldName | undefined;
    if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
    return !firstInvalid;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (shortfall > 0 || !validate()) return;

    const pedido = createOrder({
      cliente: {
        nome: nome.trim(),
        telefone,
        endereco: isDelivery ? endereco.trim() : '',
        numero: isDelivery ? numero.trim() : '',
        bairro: isDelivery ? bairro : '',
        referencia: isDelivery ? referencia.trim() : '',
      },
      itens: carrinho,
      tipoEntrega,
      taxaEntrega,
      subtotal,
      total,
      formaPagamento,
      trocoPara: pagaComTroco ? parseMoney(trocoPara) : null,
    });

    const trackingUrl = `${window.location.origin}/pedido/${pedido.id}`;
    window.open(getWhatsappUrl(buildOrderMessage(pedido, trackingUrl)), '_blank', 'noopener');

    orderPlaced.current = true;
    clearCart();
    navigate(`/pedido/${pedido.id}`, { replace: true });
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link
        to="/carrinho"
        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-red transition-colors hover:text-brand-dark"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar para o Carrinho
      </Link>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 lg:gap-10">
        <form id="checkout-form" onSubmit={handleSubmit} noValidate className="card space-y-6 p-5 sm:p-8 md:col-span-7">
          <h1 className="panel-title">Dados de Entrega & Contato</h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor={fieldId('nome')} className="field-label">Seu Nome:</label>
              <input {...fieldProps('nome')} type="text" autoComplete="name" placeholder="Ex: João da Silva" value={nome} onChange={(event) => setNome(event.target.value)} />
              <FieldError name="nome" errors={errors} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={fieldId('telefone')} className="field-label">WhatsApp / Telefone:</label>
              <input {...fieldProps('telefone')} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(85) 99999-9999" value={telefone} onChange={(event) => setTelefone(formatPhone(event.target.value))} />
              <FieldError name="telefone" errors={errors} />
            </div>
          </div>

          <div className="space-y-2">
            <span className="field-label">Modalidade de Pedido:</span>
            <DeliveryTypeSelector value={tipoEntrega} onChange={setTipoEntrega} />
          </div>

          {isDelivery ? (
            <div className="animate-fade-in space-y-4 border-t-2 border-brand-dark/10 pt-4">
              <div className="grid grid-cols-[1fr_6.5rem] gap-3 sm:grid-cols-[1fr_8rem] sm:gap-4">
                <div className="min-w-0 space-y-1.5">
                  <label htmlFor={fieldId('endereco')} className="field-label">Endereço (Rua, Av.):</label>
                  <input {...fieldProps('endereco')} type="text" autoComplete="address-line1" placeholder="Ex: Rua das Flores" value={endereco} onChange={(event) => setEndereco(event.target.value)} />
                  <FieldError name="endereco" errors={errors} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor={fieldId('numero')} className="field-label">Número:</label>
                  <input {...fieldProps('numero')} type="text" inputMode="numeric" placeholder="Ex: 124" value={numero} onChange={(event) => setNumero(event.target.value)} />
                  <FieldError name="numero" errors={errors} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-bairro" className="field-label">Bairro:</label>
                <select id="checkout-bairro" value={bairro} onChange={(event) => setBairro(event.target.value)} className="field bg-white">
                  {BAIRROS.map((item) => (
                    <option key={item.nome} value={item.nome}>
                      {item.nome} — {formatCurrency(item.taxa)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-referencia" className="field-label">Ponto de Referência (Opcional):</label>
                <input id="checkout-referencia" type="text" placeholder="Ex: Próximo ao supermercado" value={referencia} onChange={(event) => setReferencia(event.target.value)} className="field" />
              </div>
            </div>
          ) : (
            <div className="animate-fade-in space-y-2 border-2 border-brand-red bg-brand-red/5 p-4 text-sm font-medium text-stone-700">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-red">
                <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
                Local de Retirada na Loja:
              </span>
              <b className="block text-brand-dark">{PIZZARIA_INFO.endereco}</b>
              <p>
                Seu pedido estará pronto para retirada em cerca de <b>{RETIRADA_TEMPO_ESTIMADO_MIN} minutos</b>.
              </p>
            </div>
          )}

          <div className="space-y-4 border-t-2 border-brand-dark/10 pt-4">
            <h2 className="flex items-start gap-1.5 text-sm font-black uppercase tracking-wider text-brand-dark">
              <CreditCard className="h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
              Forma de Pagamento (Pague no Recebimento)
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PAYMENT_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.id}
                  selected={formaPagamento === option.id}
                  onClick={() => setFormaPagamento(option.id)}
                  className="flex items-center gap-3 p-3.5"
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs font-black text-white shadow-brand-sm ${option.badgeClass}`}>
                    {option.badge}
                  </span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-wider text-brand-dark">{option.label}</span>
                    <span className="block text-[11px] font-medium text-stone-600">{option.hint}</span>
                  </span>
                </ChoiceButton>
              ))}
            </div>

            {formaPagamento === 'dinheiro' && (
              <div className="animate-fade-in space-y-2 border-2 border-brand-dark bg-brand-bg p-4">
                <label htmlFor={fieldId('trocoPara')} className="field-label">Precisa de troco para quanto?</label>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black">R$</span>
                  <input
                    {...fieldProps('trocoPara')}
                    type="text"
                    inputMode="decimal"
                    placeholder={`Ex: ${Math.ceil((total + 1) / 10) * 10}`}
                    value={trocoPara}
                    onChange={(event) => setTrocoPara(event.target.value)}
                  />
                </div>
                <p className="text-[11px] font-medium text-stone-600">Deixe em branco se tiver o valor exato.</p>
                <FieldError name="trocoPara" errors={errors} />
              </div>
            )}
          </div>
        </form>

        <aside className="card space-y-6 p-5 sm:p-8 md:sticky md:top-36 md:col-span-5">
          <h2 className="panel-title">Itens Adicionados</h2>

          <div className="max-h-56 overflow-y-auto pr-2">
            <OrderItemsList itens={carrinho} />
          </div>

          <div className="border-t-2 border-brand-dark/10 pt-4">
            <OrderTotals subtotal={subtotal} taxaEntrega={taxaEntrega} total={total} tipoEntrega={tipoEntrega} bairro={isDelivery ? bairro : undefined} />
          </div>

          {shortfall > 0 && <MinimumOrderAlert shortfall={shortfall} />}

          <div className="space-y-1.5 border-2 border-brand-red bg-brand-red/5 p-4 text-xs font-medium leading-relaxed text-stone-700">
            <span className="flex items-center gap-1 font-black uppercase tracking-wider text-brand-red">
              <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
              Como funciona o fechamento?
            </span>
            <p>
              Ao clicar em <b>Enviar pelo WhatsApp</b>, abriremos uma janela de chat com o número da pizzaria. Você só
              precisa apertar o botão enviar. O pagamento é feito <b>no ato da entrega ou da retirada</b>.
            </p>
            <p className="font-bold text-brand-dark">
              Site demonstrativo: nenhuma pizza será produzida ou entregue. Não informe dados reais.
            </p>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={shortfall > 0}
            className="press flex w-full items-center justify-center gap-2 bg-brand-green py-4 text-xs font-black uppercase tracking-widest text-white shadow-brand hover:bg-brand-dark disabled:pointer-events-none disabled:bg-stone-200 disabled:text-stone-500 disabled:shadow-none"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Enviar pelo WhatsApp
          </button>
        </aside>
      </div>
    </div>
  );
}
