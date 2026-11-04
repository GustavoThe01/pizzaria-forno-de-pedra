import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../lib/format';
import { getStartingPrice, isPizza, type MenuEntry } from '../../lib/menu';
import { FallbackImage } from '../ui/FallbackImage';

const actionClass =
  'flex shrink-0 items-center gap-1.5 bg-brand-dark px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white shadow-brand-sm transition-colors hover:bg-brand-red';

interface MenuItemCardProps {
  entry: MenuEntry;
  /** Sem `onAdd`, o botão leva ao cardápio com o item já aberto. */
  onAdd?: () => void;
}

export function MenuItemCard({ entry: { sabor }, onAdd }: MenuItemCardProps) {
  const pizza = isPizza(sabor);

  return (
    <article className="card press group flex flex-col">
      <div className="relative h-48 overflow-hidden bg-stone-100 sm:h-52">
        <FallbackImage
          src={sabor.imagem}
          alt={sabor.nome}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 bg-brand-dark px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-amber-400 shadow-brand-sm">
          {pizza ? 'Forno de Pedra 🔥' : 'Bebida Gelada'}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
        <div>
          <h3 className="mb-2 text-lg font-black uppercase leading-tight text-brand-dark transition-colors group-hover:text-brand-red">
            {sabor.nome}
          </h3>
          <p className="line-clamp-3 text-sm font-medium leading-relaxed text-stone-600">{sabor.descricao}</p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <div>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
              {pizza ? 'A partir de' : 'Preço'}
            </span>
            <span className="whitespace-nowrap font-mono text-base font-black text-brand-dark">
              {formatCurrency(getStartingPrice(sabor))}
            </span>
          </div>

          {onAdd ? (
            <button type="button" onClick={onAdd} className={actionClass} aria-label={`Adicionar ${sabor.nome}`}>
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Adicionar
            </button>
          ) : (
            <Link to={`/cardapio?item=${sabor.id}`} className={actionClass} aria-label={`Pedir ${sabor.nome}`}>
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Pedir
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
