import { BAIRROS, PEDIDO_MINIMO_ENTREGA } from '../data/delivery';
import { HORARIO_FUNCIONAMENTO } from '../data/pizzaria';
import type { CartItem, TipoEntrega } from '../types';

export const getSubtotal = (itens: CartItem[]): number =>
  itens.reduce((sum, item) => sum + item.precoUnitario * item.quantidade, 0);

export const getItemCount = (itens: CartItem[]): number =>
  itens.reduce((sum, item) => sum + item.quantidade, 0);

export const getDeliveryFee = (tipoEntrega: TipoEntrega, bairro: string): number =>
  tipoEntrega === 'retirada' ? 0 : (BAIRROS.find((item) => item.nome === bairro)?.taxa ?? 0);

/** Valor que ainda falta para o pedido mínimo do delivery. Zero quando atendido. */
export const getMinimumOrderShortfall = (tipoEntrega: TipoEntrega, subtotal: number): number =>
  tipoEntrega === 'delivery' ? Math.max(0, PEDIDO_MINIMO_ENTREGA - subtotal) : 0;

/** Gera um id legível e sem colisão: PED-20261104-K7M2. */
export const generateOrderId = (date: Date = new Date()): string => {
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(4)), (byte) => alphabet[byte % alphabet.length]);
  return `PED-${stamp}-${suffix.join('')}`;
};

export const isPizzariaOpen = (now: Date = new Date()): boolean => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: HORARIO_FUNCIONAMENTO.fusoHorario,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const minutes = Number(read('hour')) * 60 + Number(read('minute'));

  return (
    read('weekday') !== HORARIO_FUNCIONAMENTO.diaFechado &&
    minutes >= HORARIO_FUNCIONAMENTO.abreEmMinutos &&
    minutes < HORARIO_FUNCIONAMENTO.fechaEmMinutos
  );
};
