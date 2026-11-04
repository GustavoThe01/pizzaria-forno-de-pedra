import { ArrowLeft, ArrowRight, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MinimumOrderAlert } from '../components/order/MinimumOrderAlert';
import { OrderTotals } from '../components/order/OrderTotals';
import { DeliveryTypeSelector } from '../components/ui/DeliveryTypeSelector';
import { EmptyState } from '../components/ui/EmptyState';
import { FallbackImage } from '../components/ui/FallbackImage';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { useCart } from '../context/CartContext';
import { BAIRROS } from '../data/delivery';
import { formatCurrency } from '../lib/format';
import { getDeliveryFee, getItemCount, getMinimumOrderShortfall, getSubtotal } from '../lib/order';

export default function Carrinho() {
  const { carrinho, updateQuantity, removeFromCart, clearCart, tipoEntrega, setTipoEntrega, bairro, setBairro } = useCart();

  if (carrinho.length === 0) {
    return (
      <EmptyState
        Icon={ShoppingCart}
        eyebrow="Ops!"
        title="Seu carrinho está vazio"
        description="Nenhuma pizza dourada ou refrigerante gelado por aqui ainda. Que tal dar uma olhada no nosso menu?"
      >
        <Link
          to="/cardapio"
          className="press inline-flex items-center justify-center gap-2 bg-brand-dark px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Ver Cardápio
        </Link>
      </EmptyState>
    );
  }

  const subtotal = getSubtotal(carrinho);
  const taxaEntrega = getDeliveryFee(tipoEntrega, bairro);
  const shortfall = getMinimumOrderShortfall(tipoEntrega, subtotal);
  const totalItens = getItemCount(carrinho);

  return (
    <div className="mx-auto max-w-6xl animate-fade-in space-y-8 px-4 py-12 sm:space-y-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="flex items-center gap-3 border-b border-brand-dark/10 pb-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-red text-white shadow-brand-sm">
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="section-title text-2xl leading-none sm:text-3xl">Meu Carrinho</h1>
          <span className="mt-1.5 block text-[11px] font-black uppercase tracking-widest text-brand-red">
            {totalItens} {totalItens === 1 ? 'item selecionado' : 'itens selecionados'}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-6 lg:col-span-7">
          <ul className="space-y-6">
            {carrinho.map((item) => (
              <li key={item.cartId} className="card space-y-4 p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <FallbackImage
                    src={item.imagem}
                    alt=""
                    className="h-16 w-16 shrink-0 border border-stone-100 object-cover shadow-brand-sm sm:h-20 sm:w-20"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-black uppercase leading-tight text-brand-dark">{item.nomeSabor}</h2>
                    <div className="mt-1.5 space-y-0.5 text-xs font-semibold text-stone-600">
                      <span className="block">
                        Tamanho: <b className="text-brand-dark">{item.tamanho}</b>
                      </span>
                      {item.borda && (
                        <span className="block text-brand-red">
                          Borda: <b>{item.borda.nome}</b> (+ {formatCurrency(item.borda.preco)})
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartId)}
                    aria-label={`Excluir ${item.nomeSabor}`}
                    title="Excluir item"
                    className="-mr-1 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-stone-500 transition-colors hover:bg-brand-red/5 hover:text-brand-red"
                  >
                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-stone-100 pt-4">
                  <QuantityStepper
                    value={item.quantidade}
                    label={item.nomeSabor}
                    onDecrease={() => updateQuantity(item.cartId, -1)}
                    onIncrease={() => updateQuantity(item.cartId, 1)}
                  />
                  <div className="text-right">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">Subtotal</span>
                    <span className="whitespace-nowrap font-mono text-sm font-black text-brand-dark sm:text-base">
                      {formatCurrency(item.precoUnitario * item.quantidade)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Link
              to="/cardapio"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-red transition-colors hover:text-brand-dark"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Continuar comprando
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-black uppercase tracking-wider text-stone-500 underline underline-offset-4 hover:text-brand-red"
            >
              Esvaziar carrinho
            </button>
          </div>
        </div>

        <aside className="card space-y-6 p-5 sm:p-8 lg:sticky lg:top-36 lg:col-span-5">
          <h2 className="panel-title">Resumo do Pedido</h2>

          <div className="space-y-3">
            <span className="field-label">Como deseja receber?</span>
            <DeliveryTypeSelector value={tipoEntrega} onChange={setTipoEntrega} />
          </div>

          {tipoEntrega === 'delivery' && (
            <div className="space-y-2">
              <label htmlFor="cart-bairro" className="field-label">Selecione o bairro:</label>
              <select id="cart-bairro" value={bairro} onChange={(event) => setBairro(event.target.value)} className="field bg-white">
                {BAIRROS.map((item) => (
                  <option key={item.nome} value={item.nome}>
                    {item.nome} — {formatCurrency(item.taxa)} ({item.tempoEstimadoMin} min)
                  </option>
                ))}
              </select>
            </div>
          )}

          <OrderTotals
            subtotal={subtotal}
            taxaEntrega={taxaEntrega}
            total={subtotal + taxaEntrega}
            tipoEntrega={tipoEntrega}
            bairro={bairro}
            totalLabel="Total Estimado"
          />

          {shortfall > 0 && <MinimumOrderAlert shortfall={shortfall} />}

          {shortfall > 0 ? (
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 bg-stone-200 py-4 text-sm font-black uppercase tracking-widest text-stone-500"
            >
              Finalizar Pedido
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : (
            <Link
              to="/checkout"
              className="press flex w-full items-center justify-center gap-2 bg-brand-red py-4 text-sm font-black uppercase tracking-widest text-white shadow-brand"
            >
              Finalizar Pedido
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          )}

          <p className="text-center font-mono text-[11px] font-black uppercase leading-normal text-stone-500">
            🛵 Pagamento somente na entrega ou retirada
          </p>
        </aside>
      </div>
    </div>
  );
}
