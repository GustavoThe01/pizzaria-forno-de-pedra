import { Award, Flame, Heart, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/ui/PageHeading';
import { PIZZARIA_INFO } from '../data/pizzaria';

const PILARES: { title: string; text: string; Icon: LucideIcon; tone: string }[] = [
  {
    title: 'Forno de Pedra Real',
    text: 'Nada de forno elétrico ou esteira industrial. Nossas pizzas tocam a pedra do forno aquecido por lenha, assando em apenas 2 minutos.',
    Icon: Flame,
    tone: 'bg-brand-red/10 text-brand-red',
  },
  {
    title: 'Farinha & Tomate',
    text: 'Trabalhamos com farinha rica em glúten de alta absorção e tomates frescos moídos no mesmo dia para um molho adocicado natural.',
    Icon: Award,
    tone: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'Respeito ao Tempo',
    text: 'Respeitamos o tempo biológico da levedura. Nossas 48h de descanso quebram os açúcares pesados da farinha, tornando a pizza levíssima.',
    Icon: Heart,
    tone: 'bg-brand-red/10 text-brand-red',
  },
];

export default function Sobre() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8">
      <PageHeading
        eyebrow="Nossa Tradição"
        title="História do Forno de Pedra"
        description="Tradição napolitana, ingredientes nobres e amor pela gastronomia artesanal."
      />

      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="space-y-6">
          <h2 className="section-title text-xl tracking-tight sm:text-2xl">O resgate da verdadeira receita napolitana</h2>
          <p className="text-sm font-medium leading-relaxed text-stone-600 sm:text-base">
            Fundada em {PIZZARIA_INFO.origemAno} pelo{' '}
            <strong className="font-black text-brand-red">Mestre Pizzaiolo Gustavion</strong>, a {PIZZARIA_INFO.nome}{' '}
            nasceu com a missão de resgatar o sabor autêntico das antigas pizzarias napolitanas no coração do bairro
            Cidade 2000, em Fortaleza, Ceará. Nossas massas são de fermentação lenta (48h), abertas manualmente e assadas
            em forno a lenha ecológico a mais de 400°C, garantindo bordas douradas e alvéolos perfeitos. Usamos apenas
            ingredientes frescos e molho de tomates moídos no mesmo dia.
          </p>
          <p className="border-l-4 border-brand-red pl-4 text-sm font-medium leading-relaxed text-stone-600 sm:text-base">
            Cada pizza é aberta manualmente pelos nossos pizzaiolos experientes. A borda infla sob o calor intenso de
            mais de 400°C da lenha ecológica, criando as famosas manchas escuras (conhecidas pelos italianos como
            "leopard spots"), que dão o aroma defumado inconfundível.
          </p>
        </div>

        <figure className="relative">
          <div className="absolute inset-0 hidden -rotate-3 rounded-[40px] bg-brand-red/5 sm:block" aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden rounded-[32px] border-8 border-white shadow-2xl sm:rotate-1">
            <img
              src="/images/pizzaiolo-gustavion-preparando-fermento.webp"
              width={1200}
              height={1200}
              loading="lazy"
              decoding="async"
              alt="Mestre pizzaiolo Gustavion preparando o fermento natural diante do forno a lenha"
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-5 pt-14 font-mono text-[11px] font-black uppercase tracking-widest text-white">
              <span className="text-amber-400">Gustavion</span> preparando o fermento natural (Levain)
            </figcaption>
          </div>
        </figure>
      </section>

      <section className="border-t border-brand-dark/10 pt-12">
        <div className="mb-10 text-center sm:mb-12">
          <span className="eyebrow mb-2">Nosso Compromisso</span>
          <h2 className="section-title text-2xl">Nossos Pilares Inegociáveis</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PILARES.map(({ title, text, Icon, tone }) => (
            <article key={title} className="card press space-y-4 p-6 text-center sm:p-8">
              <span className={`mx-auto flex h-12 w-12 items-center justify-center ${tone}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-base font-black uppercase text-brand-dark">{title}</h3>
              <p className="text-sm font-medium leading-relaxed text-stone-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6 border-2 border-brand-dark bg-brand-dark p-6 text-center text-white shadow-brand-dark sm:p-10">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">Pronto para ter essa experiência?</h2>
        <p className="mx-auto max-w-lg text-sm font-medium leading-relaxed text-stone-300">
          Navegue pelo nosso cardápio digital, selecione seus sabores favoritos e faça seu pedido direto para nossa
          cozinha agora mesmo.
        </p>
        <Link
          to="/cardapio"
          className="inline-flex bg-brand-red px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#a83019]"
        >
          Pedir Minha Pizza 🍕
        </Link>
      </section>
    </div>
  );
}
