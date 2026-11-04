import { Check, Info, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemCustomizerModal } from '../components/menu/ItemCustomizerModal';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { PageHeading } from '../components/ui/PageHeading';
import { useCart } from '../context/CartContext';
import { CATEGORIAS } from '../data/menu';
import { normalizeText } from '../lib/format';
import { findMenuEntry, MENU_ENTRIES, type MenuEntry } from '../lib/menu';
import type { CartItem } from '../types';

const ALL_CATEGORIES = 'todos';
const FILTERS = [{ id: ALL_CATEGORIES, nome: 'Todos os Itens' }, ...CATEGORIAS];
const TOAST_DURATION_MS = 3000;

export default function Cardapio() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoria, setCategoria] = useState<string>(ALL_CATEGORIES);
  const [busca, setBusca] = useState('');
  const [customizing, setCustomizing] = useState<MenuEntry | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Abre direto o item vindo de um link, por exemplo /cardapio?item=margherita.
  const itemParam = searchParams.get('item');
  useEffect(() => {
    if (!itemParam) return;
    const entry = findMenuEntry(itemParam);
    if (entry) setCustomizing(entry);
    setSearchParams({}, { replace: true });
  }, [itemParam, setSearchParams]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const itens = useMemo(() => {
    const termo = normalizeText(busca.trim());
    return MENU_ENTRIES.filter(
      ({ sabor, categoriaId }) =>
        (categoria === ALL_CATEGORIES || categoriaId === categoria) &&
        normalizeText(`${sabor.nome} ${sabor.descricao}`).includes(termo),
    );
  }, [categoria, busca]);

  const handleConfirm = (item: Omit<CartItem, 'cartId'>) => {
    addToCart(item);
    setToast(`Adicionado: ${item.quantidade}x ${item.nomeSabor} (${item.tamanho})`);
    setCustomizing(null);
  };

  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-10 px-4 py-12 sm:space-y-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHeading
        eyebrow="Menu Tradicional"
        title="Nosso Cardápio Digital"
        description="Monte sua pizza com borda recheada, escolha tamanhos ou adicione bebidas geladas. Tudo preparado na hora!"
      />

      <div className="flex flex-col gap-4 border-2 border-brand-dark bg-white p-4 shadow-brand-sm lg:flex-row lg:items-center lg:justify-between sm:p-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          {FILTERS.map((filtro) => (
            <button
              key={filtro.id}
              type="button"
              onClick={() => setCategoria(filtro.id)}
              aria-pressed={categoria === filtro.id}
              className={`whitespace-nowrap border-2 px-3.5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors sm:px-4 sm:text-xs ${
                categoria === filtro.id
                  ? 'border-brand-red bg-brand-red text-white shadow-brand-sm'
                  : 'border-brand-dark bg-brand-bg text-brand-dark/80 hover:bg-brand-dark/5'
              }`}
            >
              {filtro.nome}
            </button>
          ))}
        </div>

        <div className="relative w-full shrink-0 lg:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" aria-hidden="true" />
          <input
            type="search"
            aria-label="Buscar no cardápio"
            placeholder="Buscar sabor ou ingrediente..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="field pl-10"
          />
        </div>
      </div>

      {itens.length === 0 ? (
        <div className="card space-y-4 px-4 py-20 text-center">
          <Info className="mx-auto h-10 w-10 text-brand-red" aria-hidden="true" />
          <p className="text-sm font-black uppercase tracking-wider text-brand-dark">Nenhum sabor encontrado.</p>
          <p className="text-xs font-semibold text-stone-600">Tente digitar outros termos ou mude a categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((entry) => (
            <MenuItemCard key={entry.sabor.id} entry={entry} onAdd={() => setCustomizing(entry)} />
          ))}
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 border-2 border-brand-red bg-brand-dark px-5 py-4 text-white shadow-brand"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red">
            <Check className="h-3.5 w-3.5 stroke-[3px]" aria-hidden="true" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider">{toast}</span>
        </div>
      )}

      {customizing && (
        <ItemCustomizerModal
          key={customizing.sabor.id}
          entry={customizing}
          onClose={() => setCustomizing(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
