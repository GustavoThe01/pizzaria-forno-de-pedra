import { ShieldAlert } from 'lucide-react';
import { PEDIDO_MINIMO_ENTREGA } from '../../data/delivery';
import { formatCurrency } from '../../lib/format';

export function MinimumOrderAlert({ shortfall }: { shortfall: number }) {
  return (
    <div role="alert" className="flex gap-3 border-2 border-brand-red bg-brand-red/5 p-4 text-xs font-medium leading-normal text-brand-red">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <span className="mb-1 block font-black uppercase tracking-wider">Mínimo não atingido</span>
        O valor mínimo para entrega é de <b>{formatCurrency(PEDIDO_MINIMO_ENTREGA)}</b>. Adicione mais{' '}
        {formatCurrency(shortfall)} ou escolha a retirada na loja.
      </div>
    </div>
  );
}
