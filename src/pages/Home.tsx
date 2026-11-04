import { Award, ChevronRight, Flame, Leaf, Star, Truck, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { FallbackImage } from '../components/ui/FallbackImage';
import { DESTAQUES_IDS } from '../data/menu';
import { PIZZARIA_INFO } from '../data/pizzaria';
import { findMenuEntry, MENU_ENTRIES } from '../lib/menu';

const HERO_BADGES = [
  { label: 'Massa', value: '48H Levain' },
  { label: 'Forno', value: '400°C+ Real' },
  { label: 'Trabalho', value: 'Artesanal' },
];

const DIFERENCIAIS: { title: string; text: string; Icon: LucideIcon; tone: 'red' | 'green' }[] = [
  {
    title: 'Forno de Pedra',
    text: 'Nossas pizzas são assadas diretamente na pedra do forno ecológico a lenha, garantindo crocância e sabor único.',
    Icon: Flame,
    tone: 'red',
  },
  {
    title: 'Massa Levain',
    text: 'Fermentação lenta de 48 horas. Resulta em uma massa leve, aerada e de digestão incrivelmente fácil.',
    Icon: Leaf,
    tone: 'green',
  },
  {
    title: 'Premium',
    text: 'Trabalhamos com mussarela premium selecionada, ingredientes frescos e tomates maduros todos os dias.',
    Icon: Award,
    tone: 'red',
  },
  {
    title: 'Entrega Veloz',
    text: 'Nossos motoqueiros parceiros conhecem todos os atalhos. Sua pizza chega fumegante na caixa térmica.',
    Icon: Truck,
    tone: 'green',
  },
];

const DEPOIMENTOS = [
  {
    autor: 'Mariana Costa',
    detalhe: 'Cliente há 3 anos',
    texto: 'A pizza de Margherita deles é sensacional! A massa realmente é muito leve e as bordas parecem aquelas pizzas tradicionais de Nápoles. Chegou super quentinha aqui na Cidade 2000.',
  },
  {
    autor: 'Rodrigo Souza',
    detalhe: 'Cliente Mensal',
    texto: 'O sistema de pedir pelo WhatsApp com a taxa calculada automaticamente no site facilitou muito. E o acompanhamento me manteve informado. Recomendo muito a Toscana com borda de Cheddar!',
  },
  {
    autor: 'Ana Paula G.',
    detalhe: 'Cliente Semanal',
    texto: 'Melhor custo-benefício de pizza de forno a lenha de verdade. A massa de longa fermentação não pesa no estômago. A Frango com Catupiry deles é o meu ponto fraco aos domingos.',
  },
];

const TONE_CLASSES = {
  red: 'bg-brand-red/10 text-brand-red',
  green: 'bg-brand-green/10 text-brand-green',
};

const ctaClass = 'press px-8 py-4 text-center text-sm font-black uppercase tracking-widest text-white sm:py-5';

export default function Home() {
  const margherita = findMenuEntry('margherita')?.sabor;
  const destaques = MENU_ENTRIES.filter((entry) => DESTAQUES_IDS.includes(entry.sabor.id));

  return (
    <div>
      {/* Hero */}
      <section className="overflow-hidden border-b border-brand-dark/5 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="space-y-8 lg:col-span-7">
            <div>
              <span className="mb-5 inline-block rounded-sm bg-brand-green px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white">
                Desde {PIZZARIA_INFO.origemAno}
              </span>
              <h1 className="section-title mb-6 text-[2.75rem] leading-[0.95] sm:text-6xl xl:text-[80px]">
                A Arte da <br />
                <span className="text-brand-red">verdadeira fatia.</span>
              </h1>
              <p className="max-w-xl border-l-4 border-brand-red pl-5 text-base font-medium leading-relaxed text-stone-600 sm:text-xl">
                Massa artesanal fermentada lentamente por 48 horas. Assada com lenha ecológica a mais de 400°C.
                Autenticidade que você sente em cada mordida.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to="/cardapio" className={`${ctaClass} bg-brand-red shadow-brand`}>
                Explorar Cardápio
              </Link>
              <Link to="/sobre" className={`${ctaClass} bg-brand-dark shadow-brand-dark`}>
                Nossa História
              </Link>
            </div>

            <dl className="grid max-w-md grid-cols-3 gap-3 border-t border-brand-dark/10 pt-6 sm:gap-6">
              {HERO_BADGES.map((badge) => (
                <div key={badge.label}>
                  <dt className="mb-1 text-[11px] font-black uppercase tracking-widest text-brand-red">{badge.label}</dt>
                  <dd className="text-sm font-black uppercase leading-tight tracking-tight sm:text-lg">{badge.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {margherita && (
            <div className="relative flex items-center justify-center lg:col-span-5">
              <div className="absolute inset-0 hidden -rotate-3 rounded-[40px] bg-brand-red/5 sm:block" aria-hidden="true" />
              <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[32px] border-8 border-white bg-stone-200 shadow-2xl sm:rotate-1">
                <FallbackImage
                  src={margherita.imagem.replace('w=600', 'w=800')}
                  alt={`Pizza ${margherita.nome}`}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-brand-green px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
                  Pague na Entrega 🛵
                </span>
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-stone-100/80 bg-white p-4 shadow-xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-brand-red">Favorito da Casa</p>
                  <h2 className="text-lg font-black uppercase italic text-brand-dark sm:text-xl">{margherita.nome}</h2>
                  <p className="line-clamp-2 text-xs font-medium leading-relaxed text-stone-600">{margherita.descricao}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="border-b border-brand-dark/5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center sm:mb-16">
            <span className="eyebrow">Por que somos diferentes?</span>
            <h2 className="section-title text-3xl sm:text-4xl">Nossos Segredos de Qualidade</h2>
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
              Trabalhamos com ingredientes nobres e respeito absoluto às tradições italianas de panificação.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {DIFERENCIAIS.map(({ title, text, Icon, tone }) => (
              <article key={title} className="card press space-y-4 p-6 sm:p-8">
                <div className={`flex h-12 w-12 items-center justify-center ${TONE_CLASSES[tone]}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-base font-black uppercase text-brand-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-brand-dark/10 pb-6 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Os Favoritos dos Clientes</span>
              <h2 className="section-title mt-1 text-2xl sm:text-3xl">Campeões de Pedidos</h2>
            </div>
            <Link
              to="/cardapio"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-red transition-colors hover:text-brand-dark"
            >
              Ver cardápio completo
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((entry) => (
              <MenuItemCard key={entry.sabor.id} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="border-y border-white/5 bg-brand-dark py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl space-y-2 text-center sm:mb-16">
            <span className="block font-mono text-[11px] font-black uppercase tracking-widest text-amber-400">
              Depoimentos ilustrativos
            </span>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter sm:text-3xl">Quem Prova, Recomenda</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {DEPOIMENTOS.map((depoimento) => (
              <figure key={depoimento.autor} className="flex flex-col justify-between gap-4 border border-white/10 bg-stone-900/50 p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex gap-1" role="img" aria-label="Avaliação: 5 de 5 estrelas">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-sm font-medium italic leading-relaxed text-stone-300">
                    "{depoimento.texto}"
                  </blockquote>
                </div>
                <figcaption className="border-t border-white/5 pt-4">
                  <span className="block text-xs font-black uppercase tracking-wider text-white">{depoimento.autor}</span>
                  <span className="mt-0.5 block font-mono text-[11px] text-stone-400">{depoimento.detalhe}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-8 px-4 text-center">
          <h2 className="section-title text-3xl sm:text-4xl">Quer provar hoje mesmo?</h2>
          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-stone-600 sm:text-base">
            Estamos abertos de terça a domingo a partir das 18h. Faça seu pedido online agora e acompanhe o preparo até
            a entrega!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/cardapio" className={`${ctaClass} w-full bg-brand-red shadow-brand sm:w-auto`}>
              Fazer Pedido Agora 🍕
            </Link>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500 sm:text-sm">
              Ou faça sua visita!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
