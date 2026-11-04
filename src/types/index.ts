export type TamanhoId = 'brotinho' | 'media' | 'grande' | 'familia';
export type PrecoId = TamanhoId | 'unidade';
export type CategoriaId = 'tradicionais' | 'especiais' | 'doces' | 'bebidas';

export interface Sabor {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  /** Pizzas têm preço por tamanho; bebidas têm apenas `unidade`. */
  precos: Partial<Record<PrecoId, number>>;
}

export interface Categoria {
  id: CategoriaId;
  nome: string;
  sabores: Sabor[];
}

export interface Borda {
  id: string;
  nome: string;
  preco: number;
  /** Restringe a borda a um tipo de pizza. Sem valor, vale para todas. */
  apenas?: 'salgada' | 'doce';
}

export interface Tamanho {
  id: TamanhoId;
  nome: string;
  fatias: number;
}

export interface Bairro {
  nome: string;
  taxa: number;
  tempoEstimadoMin: number;
}

export interface Cliente {
  nome: string;
  telefone: string;
  /** Campos de endereço ficam vazios em pedidos com retirada na loja. */
  endereco: string;
  numero: string;
  bairro: string;
  referencia?: string;
}

export interface CartItem {
  cartId: string;
  saborId: string;
  nomeSabor: string;
  /** Rótulo pronto para exibição, por exemplo "Grande (8 fatias)". */
  tamanho: string;
  borda: Pick<Borda, 'id' | 'nome' | 'preco'> | null;
  quantidade: number;
  precoUnitario: number;
  imagem: string;
}

export type TipoEntrega = 'delivery' | 'retirada';
export type FormaPagamento = 'pix' | 'dinheiro' | 'credito' | 'debito';
export type OrderStatus = 'recebido' | 'preparando' | 'saiu_para_entrega' | 'entregue';

export interface Pedido {
  id: string;
  cliente: Cliente;
  itens: CartItem[];
  tipoEntrega: TipoEntrega;
  taxaEntrega: number;
  subtotal: number;
  total: number;
  formaPagamento: FormaPagamento;
  trocoPara: number | null;
  status: OrderStatus;
  criadoEm: string;
  statusUpdatedAt: string;
}

export type NovoPedido = Omit<Pedido, 'id' | 'status' | 'criadoEm' | 'statusUpdatedAt'>;
