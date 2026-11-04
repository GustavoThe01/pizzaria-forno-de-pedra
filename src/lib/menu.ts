import { BORDAS, CATEGORIAS } from '../data/menu';
import type { Borda, Categoria, CategoriaId, Sabor } from '../types';

export interface MenuEntry {
  sabor: Sabor;
  categoriaId: CategoriaId;
}

export const MENU_ENTRIES: MenuEntry[] = CATEGORIAS.flatMap((categoria: Categoria) =>
  categoria.sabores.map((sabor) => ({ sabor, categoriaId: categoria.id })),
);

export const findMenuEntry = (saborId: string): MenuEntry | undefined =>
  MENU_ENTRIES.find((entry) => entry.sabor.id === saborId);

/** Pizzas têm tamanho e borda; itens com preço único são vendidos por unidade. */
export const isPizza = (sabor: Sabor): boolean => sabor.precos.unidade === undefined;

export const getStartingPrice = (sabor: Sabor): number =>
  Math.min(...Object.values(sabor.precos).filter((price) => price !== undefined));

export const getBordasFor = (categoriaId: CategoriaId): Borda[] => {
  const tipo = categoriaId === 'doces' ? 'doce' : 'salgada';
  return BORDAS.filter((borda) => !borda.apenas || borda.apenas === tipo);
};
