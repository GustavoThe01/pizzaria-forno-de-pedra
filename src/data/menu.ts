import type { Borda, Categoria, Tamanho } from '../types';

export const CATEGORIAS: Categoria[] = [
  {
    id: 'tradicionais',
    nome: 'Pizzas Tradicionais',
    sabores: [
      {
        id: 'mussarela',
        nome: 'Mussarela',
        descricao: 'Molho de tomate artesanal, mussarela premium ralada, rodelas de tomate fresco, azeitonas pretas e orégano.',
        imagem: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
        precos: { brotinho: 28, media: 38, grande: 48, familia: 58 },
      },
      {
        id: 'margherita',
        nome: 'Margherita',
        descricao: 'Molho de tomate, mussarela, fatias de tomate fresco, manjericão fresco colhido na hora, parmesão ralado e azeite de oliva.',
        imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80',
        precos: { brotinho: 29, media: 39, grande: 49, familia: 59 },
      },
      {
        id: 'toscana',
        nome: 'Toscana',
        descricao: 'Molho de tomate artesanal, mussarela, calabresa fatiada de alta qualidade, cebola caramelizada e orégano.',
        imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/d8133fe8b5933594698b20331fea7c64_XL.jpg',
        precos: { brotinho: 30, media: 40, grande: 50, familia: 60 },
      },
      {
        id: 'pepperoni',
        nome: 'Pepperoni',
        descricao: 'Molho de tomate artesanal, mussarela premium ralada, fatias crocantes de pepperoni especial e orégano.',
        imagem: 'https://www.seara.com.br/wp-content/uploads/2025/09/pizza-de-pepperoni-caseira-portal-minha-receita.jpg',
        precos: { brotinho: 32, media: 42, grande: 52, familia: 62 },
      },
      {
        id: 'portuguesa',
        nome: 'Portuguesa',
        descricao: 'Molho de tomate, mussarela, presunto cozido, ovos cozidos fatiados, cebola, ervilha, milho, palmito e azeitonas.',
        imagem: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&auto=format&fit=crop&q=80',
        precos: { brotinho: 32, media: 42, grande: 52, familia: 62 },
      },
    ],
  },
  {
    id: 'especiais',
    nome: 'Pizzas Especiais',
    sabores: [
      {
        id: 'forno_de_pedra_assinatura',
        nome: 'Forno de Pedra (assinatura)',
        descricao: 'A joia da casa! Molho de tomate artesanal, mussarela especial, manjericão gigante, tomates cereja confitados, parmesão ralado e fios de azeite trufado assado perfeitamente no forno a lenha.',
        imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
        precos: { brotinho: 36, media: 46, grande: 56, familia: 66 },
      },
      {
        id: 'camarao_catupiry',
        nome: 'Camarão com Catupiry',
        descricao: 'Camarões selecionados e salteados no azeite de oliva, sob uma generosa camada do autêntico requeijão Catupiry e mussarela derretida.',
        imagem: 'https://i.pinimg.com/736x/56/0c/1a/560c1aaa3ad1c845ebaf78d1275c55b4.jpg',
        precos: { brotinho: 39, media: 49, grande: 59, familia: 69 },
      },
      {
        id: 'quatro_queijos',
        nome: 'Quatro Queijos',
        descricao: 'Combinação nobre de molho de tomate, mussarela, provolone defumado, gorgonzola cremoso e catupiry original.',
        imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
        precos: { brotinho: 35, media: 45, grande: 55, familia: 65 },
      },
      {
        id: 'frango_catupiry',
        nome: 'Frango com Catupiry',
        descricao: 'Peito de frango desfiado temperado com ervas finas, coberto com mussarela e generosas faixas do autêntico requeijão Catupiry.',
        imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
        precos: { brotinho: 33, media: 43, grande: 53, familia: 63 },
      },
      {
        id: 'vegetariana',
        nome: 'Vegetariana',
        descricao: 'Molho de tomate artesanal, mussarela, mix de pimentões coloridos, milho, ervilha, palmito tenro, tomate fresco fatiado e azeitonas pretas.',
        imagem: 'https://s2-receitas.glbimg.com/sP3pVF5XK9N8N_0U2g-gdvPhkyw=/0x0:620x413/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/A/V/03IHABTT2ZNMQzXZD4mQ/pizza-vegetariana.jpg',
        precos: { brotinho: 33, media: 43, grande: 53, familia: 63 },
      },
      {
        id: 'rucula_tomate_seco',
        nome: 'Rúcula com Tomate Seco',
        descricao: 'Molho de tomate artesanal, mussarela especial, folhas frescas de rúcula crocante, tomates secos artesanais e parmesão ralado finalizado com azeite.',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3FMMdr-ba4NlItNt5YRDfgf77-bghslefFhQfBMxSiOqQtfqaK7V_kNMU&s=10',
        precos: { brotinho: 34, media: 44, grande: 54, familia: 64 },
      },
    ],
  },
  {
    id: 'doces',
    nome: 'Pizzas Doces',
    sabores: [
      {
        id: 'chocolate_morango',
        nome: 'Chocolate com Morango',
        descricao: 'Base generosa de chocolate ao leite nobre cremoso, coberto com morangos frescos fatiados selecionados.',
        imagem: 'https://beatoven.com.br/wp-content/uploads/2024/11/sq-chocolate-com-morango.jpg.webp',
        precos: { brotinho: 29, media: 39, grande: 49 },
      },
      {
        id: 'banana_canela',
        nome: 'Banana com Canela',
        descricao: 'Bananas nanicas frescas fatiadas com canela em pó, açúcar mascavo e leite condensado sobre base levemente gratinada.',
        imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2007/01/pizzadebananaecanela.jpg',
        precos: { brotinho: 27, media: 37, grande: 47 },
      },
      {
        id: 'prestigio',
        nome: 'Prestígio',
        descricao: 'Fundo de chocolate ao leite nobre, coberto com coco ralado úmido premium e fios de chocolate adicionais.',
        imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2019/10/pizza-prestigio-14772.jpg',
        precos: { brotinho: 29, media: 39, grande: 49 },
      },
      {
        id: 'romeu_julieta',
        nome: 'Romeu e Julieta',
        descricao: 'Deliciosa combinação tradicional de goiabada cascão cremosa e queijo mussarela perfeitamente derretido.',
        imagem: 'https://www.ogastronomo.com.br/upload/111941477-pizza-romeu-e-julieta.jpg',
        precos: { brotinho: 28, media: 38, grande: 48 },
      },
      {
        id: 'brigadeiro_gourmet',
        nome: 'Brigadeiro Gourmet',
        descricao: 'Autêntico brigadeiro de colher feito com chocolate 50% cacau e confeitado com granulado belga crocante.',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi8Kb-3mHMteqd3k7iN8b6k9g6-8H11rz3q_9fpCH4bjLdS_2qnsOkOIDI&s=10',
        precos: { brotinho: 29, media: 39, grande: 49 },
      },
    ],
  },
  {
    id: 'bebidas',
    nome: 'Bebidas',
    sabores: [
      {
        id: 'refrigerante_2l',
        nome: 'Refrigerante 2 Litros',
        descricao: 'Refrigerante 2 Litros trincando de gelado para acompanhar sua pizza.',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAUfnFpFi01ZYEjVIKlaqlBE9xAzbfcTCf5rIYLHByjQPH74a31x0piqa&s=10',
        precos: { unidade: 12 },
      },
      {
        id: 'agua_mineral_500ml',
        nome: 'Água Mineral 500ml',
        descricao: 'Água mineral natural sem gás, garrafa de 500ml gelada.',
        imagem: 'https://mercantilatacado.vtexassets.com/arquivos/ids/169720/654a30fb75d9096810e2bf83.jpg?v=638349578274530000',
        precos: { unidade: 4 },
      },
      {
        id: 'agua_com_gas_500ml',
        nome: 'Água com Gás 500ml',
        descricao: 'Água mineral natural gaseificada gelada, garrafa de 500ml.',
        imagem: 'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw77c94b3f/Produtos/409316-7894900531008-agua%20mineral%20crystal%20c%20gas%20pet%20500ml-crystal-1.jpg',
        precos: { unidade: 5 },
      },
      {
        id: 'suco_natural_500ml',
        nome: 'Suco Natural 500ml',
        descricao: 'Suco integral 100% natural de uva sem adição de açúcares ou conservantes, 500ml.',
        imagem: 'https://famigliavalduga.vtexassets.com/arquivos/ids/164287-600-800',
        precos: { unidade: 9 },
      },
      {
        id: 'cerveja_long_neck',
        nome: 'Cerveja Long Neck',
        descricao: 'Cerveja long neck premium trincando de gelada.',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jBTl4haik9dm6X5MRbXZRZTHMo6gtq0NjsOVNP3DMw&s=10',
        precos: { unidade: 8 },
      },
    ],
  },
];

export const BORDA_PADRAO_ID = 'nenhuma';

export const BORDAS: Borda[] = [
  { id: BORDA_PADRAO_ID, nome: 'Tradicional (sem recheio)', preco: 0 },
  { id: 'catupiry', nome: 'Recheada de Catupiry', preco: 8, apenas: 'salgada' },
  { id: 'cheddar', nome: 'Recheada de Cheddar', preco: 8, apenas: 'salgada' },
  { id: 'chocolate', nome: 'De chocolate ao leite', preco: 10, apenas: 'doce' },
];

export const TAMANHOS: Tamanho[] = [
  { id: 'brotinho', nome: 'Brotinho', fatias: 4 },
  { id: 'media', nome: 'Média', fatias: 6 },
  { id: 'grande', nome: 'Grande', fatias: 8 },
  { id: 'familia', nome: 'Família', fatias: 12 },
];

/** Itens exibidos em "Campeões de Pedidos" na página inicial. */
export const DESTAQUES_IDS = ['mussarela', 'margherita', 'toscana'];
