import type { Bairro } from '../types';

export const BAIRROS: Bairro[] = [
  { nome: 'Cidade 2000', taxa: 3.5, tempoEstimadoMin: 15 },
  { nome: 'Papicu', taxa: 5, tempoEstimadoMin: 25 },
  { nome: 'Cocó', taxa: 6, tempoEstimadoMin: 25 },
  { nome: 'Aldeota', taxa: 8, tempoEstimadoMin: 30 },
  { nome: 'Varjota', taxa: 6.5, tempoEstimadoMin: 20 },
  { nome: 'Dunas', taxa: 8, tempoEstimadoMin: 30 },
  { nome: 'Praia do Futuro', taxa: 9, tempoEstimadoMin: 35 },
];

export const RETIRADA_TEMPO_ESTIMADO_MIN = 20;
export const PEDIDO_MINIMO_ENTREGA = 25;
