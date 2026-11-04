import { PAYMENT_LABELS } from '../data/order';
import { PIZZARIA_INFO } from '../data/pizzaria';
import type { Pedido } from '../types';
import { formatCurrency } from './format';

export const getWhatsappUrl = (message: string): string =>
  `https://wa.me/${PIZZARIA_INFO.telefoneWhats}?text=${encodeURIComponent(message)}`;

export const getMapsUrl = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const SEPARATOR = '------------------------------------';

export function buildOrderMessage(pedido: Pedido, trackingUrl: string): string {
  const { cliente, tipoEntrega } = pedido;
  const isDelivery = tipoEntrega === 'delivery';

  const itens = pedido.itens.flatMap((item) => [
    `• *${item.quantidade}x* ${item.nomeSabor} (${item.tamanho})`,
    ...(item.borda ? [`   _Borda: ${item.borda.nome}_`] : []),
    `   _Preço: ${formatCurrency(item.precoUnitario * item.quantidade)}_`,
    '',
  ]);

  const endereco = isDelivery
    ? [
        '📍 *ENDEREÇO DE ENTREGA:*',
        `${cliente.endereco}, Nº ${cliente.numero}`,
        `*Bairro:* ${cliente.bairro}`,
        ...(cliente.referencia ? [`*Referência:* ${cliente.referencia}`] : []),
      ]
    : ['📍 *ENDEREÇO DE RETIRADA:*', PIZZARIA_INFO.endereco];

  const troco =
    pedido.trocoPara !== null
      ? [
          `*Troco para:* ${formatCurrency(pedido.trocoPara)} (devolver ${formatCurrency(pedido.trocoPara - pedido.total)})`,
        ]
      : [];

  return [
    `🔥 *NOVO PEDIDO - ${PIZZARIA_INFO.nome}* 🔥`,
    SEPARATOR,
    `*Pedido:* #${pedido.id}`,
    `*Cliente:* ${cliente.nome}`,
    `*Telefone:* ${cliente.telefone}`,
    `*Tipo:* ${isDelivery ? '🛵 Delivery' : '📦 Retirada na Loja'}`,
    SEPARATOR,
    '',
    '*ITENS DO PEDIDO:*',
    ...itens,
    SEPARATOR,
    `*Subtotal:* ${formatCurrency(pedido.subtotal)}`,
    isDelivery
      ? `*Taxa de entrega (${cliente.bairro}):* ${formatCurrency(pedido.taxaEntrega)}`
      : '*Taxa:* Grátis (Retirada)',
    `*TOTAL GERAL:* ${formatCurrency(pedido.total)}`,
    SEPARATOR,
    '',
    ...endereco,
    '',
    '💳 *FORMA DE PAGAMENTO:*',
    `${PAYMENT_LABELS[pedido.formaPagamento]} (no recebimento)`,
    ...troco,
    '',
    '_Pedido gerado via catálogo digital. Acompanhamento:_',
    trackingUrl,
  ].join('\n');
}
