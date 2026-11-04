import { CreditCard, HelpCircle, MapPin, MessageSquare, Phone, Wrench } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { OrderItemsList } from '../components/order/OrderItemsList';
import { OrderProgress } from '../components/order/OrderProgress';
import { OrderTotals } from '../components/order/OrderTotals';
import { EmptyState } from '../components/ui/EmptyState';
import { useOrders } from '../context/OrdersContext';
import { getOrderStages, PAYMENT_LABELS, STATUS_SEQUENCE } from '../data/order';
import { PIZZARIA_INFO } from '../data/pizzaria';
import { formatCurrency } from '../lib/format';
import { buildOrderMessage, getWhatsappUrl } from '../lib/whatsapp';

const AUTO_ADVANCE_INTERVAL_MS = 45_000;

const emptyActionClass =
  'px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-white shadow-brand-sm transition-colors';
const simulationCtaClass =
  'w-full shrink-0 px-5 py-3 text-center text-xs font-black uppercase tracking-widest text-white shadow-brand-sm transition-colors hover:bg-brand-dark lg:w-auto';
const infoLabelClass = 'mb-0.5 block text-[11px] font-black uppercase tracking-wider text-brand-dark';

export default function PedidoStatus() {
  const { id } = useParams<{ id: string }>();
  const { pedidos, updateOrderStatus, deleteOrder } = useOrders();
  const navigate = useNavigate();

  const pedido = pedidos.find((item) => item.id === id);
  const status = pedido?.status;
  const orderId = pedido?.id;

  // Simulação: avança uma etapa a cada intervalo enquanto a página estiver aberta.
  useEffect(() => {
    if (!orderId || !status || status === 'entregue') return;
    const nextStatus = STATUS_SEQUENCE[STATUS_SEQUENCE.indexOf(status) + 1];
    if (!nextStatus) return;
    const timer = setTimeout(() => updateOrderStatus(orderId, nextStatus), AUTO_ADVANCE_INTERVAL_MS);
    return () => clearTimeout(timer);
    // updateOrderStatus muda a cada alteração de pedidos; o temporizador depende só da etapa.
  }, [orderId, status]);

  if (!pedido) {
    return (
      <EmptyState
        Icon={HelpCircle}
        eyebrow="Não Encontrado"
        title="Pedido não encontrado"
        description="Nesta demonstração, os pedidos ficam salvos apenas no navegador em que foram criados. Este código não consta no histórico deste navegador."
      >
        <Link to="/cardapio" className={`${emptyActionClass} bg-brand-red hover:bg-brand-dark`}>Fazer Novo Pedido</Link>
        <Link to="/" className={`${emptyActionClass} bg-brand-dark hover:bg-brand-red`}>Página Inicial</Link>
      </EmptyState>
    );
  }

  const isDelivery = pedido.tipoEntrega === 'delivery';
  const stages = getOrderStages(pedido.tipoEntrega);
  const currentIndex = Math.max(0, stages.findIndex((stage) => stage.status === pedido.status));
  const currentStage = stages[currentIndex];
  const isFinished = pedido.status === 'entregue';
  const whatsappUrl = getWhatsappUrl(buildOrderMessage(pedido, window.location.href));

  const handleReset = () => {
    deleteOrder(pedido.id);
    navigate('/cardapio');
  };

  return (
    <div className="mx-auto max-w-4xl animate-fade-in space-y-8 px-4 py-12 sm:space-y-10 sm:px-6 sm:py-16 lg:px-8">
      <header className="flex flex-col gap-4 border-b-2 border-brand-dark/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <span className="eyebrow">Acompanhamento</span>
          <h1 className="section-title mt-1 break-words text-2xl sm:text-3xl">
            Pedido <span className="text-brand-red">#{pedido.id}</span>
          </h1>
        </div>
        <Link
          to="/cardapio"
          className="self-start whitespace-nowrap bg-brand-dark px-5 py-3 text-[11px] font-black uppercase tracking-wider text-white shadow-brand-sm transition-colors hover:bg-brand-red sm:self-auto"
        >
          Fazer outro pedido
        </Link>
      </header>

      <section aria-label="Progresso do pedido" className="card space-y-8 p-5 sm:p-8">
        <OrderProgress stages={stages} currentIndex={currentIndex} tipoEntrega={pedido.tipoEntrega} />

        <div aria-live="polite" className="mx-auto max-w-xl space-y-2 border-2 border-brand-dark bg-brand-bg p-5 text-center">
          <h2 className="text-xs font-black uppercase tracking-wider text-brand-dark">{currentStage.label}</h2>
          <p className="text-sm font-semibold text-stone-600">{currentStage.description}</p>
        </div>

        {isFinished && (
          <div className="mx-auto max-w-xl animate-fade-in space-y-2 border-2 border-brand-green bg-brand-green/10 p-5 text-center">
            <span className="block text-2xl" aria-hidden="true">🍕🎉</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-brand-green">Pedido & Simulação Concluídos!</h3>
            <p className="text-xs font-semibold leading-relaxed text-stone-700">
              {isDelivery ? (
                <>
                  O entregador chegou com a sua pizza quentinha! A entrega foi realizada com sucesso no bairro{' '}
                  <b className="text-brand-dark">{pedido.cliente.bairro}</b> em{' '}
                  <b className="text-brand-dark">Fortaleza, Ceará</b>.
                </>
              ) : (
                <>A sua pizza foi retirada com sucesso no balcão da pizzaria.</>
              )}{' '}
              Obrigado por simular conosco!
            </p>
          </div>
        )}

        {!isFinished && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex w-fit max-w-full items-center justify-center gap-2 text-center text-xs font-black uppercase tracking-wider text-brand-green underline underline-offset-4 hover:text-brand-dark"
          >
            <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
            O WhatsApp não abriu? Enviar pedido novamente
          </a>
        )}
      </section>

      <section aria-label="Simulador de etapas" className="space-y-4 border-2 border-brand-red bg-brand-red/5 p-5">
        <div className="flex items-start gap-3">
          <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-brand-red">Simulador de Etapas (Apenas para Testes)</h2>
            <p className="mt-1 text-xs font-medium leading-normal text-stone-700">
              Como este é um sistema 100% front-end, simule as atualizações que a pizzaria faria clicando nos botões
              abaixo. As etapas também avançam sozinhas enquanto esta página estiver aberta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
          {stages.map((stage) => (
            <button
              key={stage.status}
              type="button"
              onClick={() => updateOrderStatus(pedido.id, stage.status)}
              aria-pressed={pedido.status === stage.status}
              className={`border-2 px-3 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors sm:text-xs ${
                pedido.status === stage.status
                  ? 'border-brand-red bg-brand-red text-white shadow-brand-sm'
                  : 'border-brand-dark/20 bg-white text-brand-dark hover:bg-stone-50'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-brand-red/20 pt-4 lg:flex-row lg:items-center lg:justify-between">
          {isFinished ? (
            <>
              <p className="max-w-md text-xs font-medium leading-relaxed text-stone-700">
                A simulação deste pedido foi concluída! Para fazer um novo teste, você pode limpar este pedido do
                histórico e retornar ao cardápio.
              </p>
              <button type="button" onClick={handleReset} className={`${simulationCtaClass} bg-brand-red`}>
                Zerar Pedido e Simular Novamente
              </button>
            </>
          ) : (
            <>
              <p className="max-w-md text-xs font-medium leading-relaxed text-stone-700">
                Deseja pular as etapas intermediárias? Clique ao lado para concluir a simulação e definir o status como{' '}
                <b className="text-brand-dark">{stages[stages.length - 1].label}</b>.
              </p>
              <button type="button" onClick={() => updateOrderStatus(pedido.id, 'entregue')} className={`${simulationCtaClass} bg-brand-green`}>
                Finalizar Pedido e Simulação
              </button>
            </>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
        <section className="card space-y-4 p-5 sm:p-8 md:col-span-7">
          <h2 className="panel-title">Detalhes do Pedido</h2>
          <OrderItemsList itens={pedido.itens} />
          <div className="border-t-2 border-brand-dark/10 pt-4">
            <OrderTotals
              subtotal={pedido.subtotal}
              taxaEntrega={pedido.taxaEntrega}
              total={pedido.total}
              tipoEntrega={pedido.tipoEntrega}
            />
          </div>
        </section>

        <section className="card space-y-4 p-5 sm:p-8 md:col-span-5">
          <h2 className="panel-title">{isDelivery ? 'Dados de Entrega' : 'Dados de Retirada'}</h2>
          <ul className="space-y-4 text-sm font-medium text-stone-600">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
              <div className="min-w-0 break-words">
                <span className={infoLabelClass}>Endereço:</span>
                {isDelivery ? (
                  <>
                    {pedido.cliente.endereco}, Nº {pedido.cliente.numero}
                    <br />
                    Bairro: <b>{pedido.cliente.bairro}</b>
                    {pedido.cliente.referencia && (
                      <>
                        <br />
                        Ref: <i>{pedido.cliente.referencia}</i>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    Retirada no balcão da pizzaria:
                    <br />
                    <b>{PIZZARIA_INFO.endereco}</b>
                  </>
                )}
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
              <div className="min-w-0 break-words">
                <span className={infoLabelClass}>Contato:</span>
                {pedido.cliente.nome} ({pedido.cliente.telefone})
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
              <div>
                <span className={infoLabelClass}>Forma de Pagamento:</span>
                {PAYMENT_LABELS[pedido.formaPagamento]}
                {pedido.trocoPara !== null && (
                  <span className="mt-0.5 block font-mono text-xs font-bold">
                    Troco para {formatCurrency(pedido.trocoPara)}
                  </span>
                )}
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
