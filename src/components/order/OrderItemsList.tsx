import { formatCurrency } from '../../lib/format';
import type { CartItem } from '../../types';

export function OrderItemsList({ itens }: { itens: CartItem[] }) {
  return (
    <ul className="divide-y divide-brand-dark/10">
      {itens.map((item) => (
        <li key={item.cartId} className="flex justify-between gap-4 py-3 text-xs font-medium">
          <div className="min-w-0">
            <span className="block font-black text-brand-dark">
              {item.quantidade}x {item.nomeSabor}
            </span>
            <span className="mt-0.5 block text-stone-600">{item.tamanho}</span>
            {item.borda && <span className="mt-0.5 block font-bold text-brand-red">Borda: {item.borda.nome}</span>}
          </div>
          <span className="shrink-0 whitespace-nowrap font-mono font-black text-brand-dark">
            {formatCurrency(item.precoUnitario * item.quantidade)}
          </span>
        </li>
      ))}
    </ul>
  );
}
