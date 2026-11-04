import { formatCurrency } from '../../lib/format';
import type { TipoEntrega } from '../../types';

interface OrderTotalsProps {
  subtotal: number;
  taxaEntrega: number;
  total: number;
  tipoEntrega: TipoEntrega;
  bairro?: string;
  totalLabel?: string;
  totalHint?: string;
}

export function OrderTotals({ subtotal, taxaEntrega, total, tipoEntrega, bairro, totalLabel = 'Total do Pedido', totalHint }: OrderTotalsProps) {
  const feeLabel = tipoEntrega === 'delivery' ? `Taxa de entrega${bairro ? ` (${bairro})` : ''}` : 'Retirada na loja';

  return (
    <div className="space-y-3 text-sm font-medium">
      <div className="flex justify-between gap-4 text-stone-600">
        <span>Subtotal dos itens</span>
        <span className="whitespace-nowrap font-mono font-semibold">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between gap-4 text-stone-600">
        <span>{feeLabel}</span>
        <span className="whitespace-nowrap font-mono font-semibold">{taxaEntrega > 0 ? formatCurrency(taxaEntrega) : 'Grátis'}</span>
      </div>
      <div className="flex items-end justify-between gap-4 border-t-2 border-brand-dark/10 pt-3">
        <div>
          <span className="block text-xs font-black uppercase tracking-wider text-brand-dark">{totalLabel}</span>
          {totalHint && <span className="mt-1 block font-mono text-[11px] text-stone-500">{totalHint}</span>}
        </div>
        <span className="whitespace-nowrap font-mono text-xl font-black text-brand-red">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
