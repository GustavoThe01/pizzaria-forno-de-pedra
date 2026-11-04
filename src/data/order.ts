import type { FormaPagamento, OrderStatus, TipoEntrega } from '../types';

export const STATUS_SEQUENCE: OrderStatus[] = ['recebido', 'preparando', 'saiu_para_entrega', 'entregue'];

export const PAYMENT_LABELS: Record<FormaPagamento, string> = {
  pix: 'PIX',
  dinheiro: 'Dinheiro',
  credito: 'Cartão de Crédito',
  debito: 'Cartão de Débito',
};

export interface OrderStage {
  status: OrderStatus;
  label: string;
  description: string;
}

const COMMON_STAGES: OrderStage[] = [
  {
    status: 'recebido',
    label: 'Recebido',
    description: 'Seu pedido foi recebido e está na fila da cozinha.',
  },
  {
    status: 'preparando',
    label: 'No Forno',
    description: 'Massa aberta artesanalmente e assando no forno de pedra.',
  },
];

const FINAL_STAGES: Record<TipoEntrega, OrderStage[]> = {
  delivery: [
    {
      status: 'saiu_para_entrega',
      label: 'A Caminho',
      description: 'O entregador está a caminho com sua pizza quentinha.',
    },
    {
      status: 'entregue',
      label: 'Entregue',
      description: 'Pedido entregue com sucesso. Bom apetite!',
    },
  ],
  retirada: [
    {
      status: 'saiu_para_entrega',
      label: 'Pronto',
      description: 'Sua pizza está pronta e aguardando no balcão.',
    },
    {
      status: 'entregue',
      label: 'Retirado',
      description: 'Pedido retirado com sucesso. Bom apetite!',
    },
  ],
};

export const getOrderStages = (tipoEntrega: TipoEntrega): OrderStage[] => [
  ...COMMON_STAGES,
  ...FINAL_STAGES[tipoEntrega],
];
