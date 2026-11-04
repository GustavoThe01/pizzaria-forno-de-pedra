import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BAIRROS } from '../data/delivery';
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage';
import type { CartItem, TipoEntrega } from '../types';

interface DeliveryPrefs {
  tipoEntrega: TipoEntrega;
  bairro: string;
}

interface CartContextValue extends DeliveryPrefs {
  carrinho: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  setTipoEntrega: (tipoEntrega: TipoEntrega) => void;
  setBairro: (bairro: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const DEFAULT_PREFS: DeliveryPrefs = { tipoEntrega: 'delivery', bairro: BAIRROS[0].nome };

const isValidPrefs = (value: unknown): boolean => {
  const prefs = value as Partial<DeliveryPrefs> | null;
  return (
    (prefs?.tipoEntrega === 'delivery' || prefs?.tipoEntrega === 'retirada') &&
    BAIRROS.some((bairro) => bairro.nome === prefs.bairro)
  );
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.cart, [], Array.isArray),
  );
  const [prefs, setPrefs] = useState<DeliveryPrefs>(() =>
    readStorage(STORAGE_KEYS.deliveryPrefs, DEFAULT_PREFS, isValidPrefs),
  );

  useEffect(() => writeStorage(STORAGE_KEYS.cart, carrinho), [carrinho]);
  useEffect(() => writeStorage(STORAGE_KEYS.deliveryPrefs, prefs), [prefs]);

  const value = useMemo<CartContextValue>(
    () => ({
      carrinho,
      ...prefs,
      addToCart: (item) =>
        setCarrinho((current) => {
          const isSame = (other: CartItem) =>
            other.saborId === item.saborId &&
            other.tamanho === item.tamanho &&
            other.borda?.id === item.borda?.id;

          if (current.some(isSame)) {
            return current.map((other) =>
              isSame(other) ? { ...other, quantidade: other.quantidade + item.quantidade } : other,
            );
          }
          return [...current, { ...item, cartId: crypto.randomUUID() }];
        }),
      removeFromCart: (cartId) => setCarrinho((current) => current.filter((item) => item.cartId !== cartId)),
      updateQuantity: (cartId, delta) =>
        setCarrinho((current) =>
          current.map((item) =>
            item.cartId === cartId ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item,
          ),
        ),
      clearCart: () => setCarrinho([]),
      setTipoEntrega: (tipoEntrega) => setPrefs((current) => ({ ...current, tipoEntrega })),
      setBairro: (bairro) => setPrefs((current) => ({ ...current, bairro })),
    }),
    [carrinho, prefs],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider');
  return context;
}
