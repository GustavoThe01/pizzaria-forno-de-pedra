import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { generateOrderId } from '../lib/order';
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage';
import type { NovoPedido, OrderStatus, Pedido } from '../types';

/**
 * Pedidos ficam apenas no navegador do visitante: este site é uma vitrine, sem
 * backend. Para produção, troque este contexto por uma API ou pelo Firestore.
 */
const MAX_STORED_ORDERS = 30;

interface OrdersContextValue {
  pedidos: Pedido[];
  createOrder: (data: NovoPedido) => Pedido;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>(() =>
    readStorage<Pedido[]>(STORAGE_KEYS.orders, [], Array.isArray),
  );

  useEffect(() => writeStorage(STORAGE_KEYS.orders, pedidos), [pedidos]);

  const value = useMemo<OrdersContextValue>(
    () => ({
      pedidos,
      createOrder: (data) => {
        const now = new Date();
        const pedido: Pedido = {
          ...data,
          id: generateOrderId(now),
          status: 'recebido',
          criadoEm: now.toISOString(),
          statusUpdatedAt: now.toISOString(),
        };
        setPedidos((current) => [pedido, ...current].slice(0, MAX_STORED_ORDERS));
        return pedido;
      },
      updateOrderStatus: (orderId, status) =>
        setPedidos((current) =>
          current.map((pedido) =>
            pedido.id === orderId ? { ...pedido, status, statusUpdatedAt: new Date().toISOString() } : pedido,
          ),
        ),
      deleteOrder: (orderId) => setPedidos((current) => current.filter((pedido) => pedido.id !== orderId)),
    }),
    [pedidos],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders deve ser usado dentro de OrdersProvider');
  return context;
}
