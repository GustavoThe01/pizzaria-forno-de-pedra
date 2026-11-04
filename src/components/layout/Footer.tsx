import { Clock, Code, Github, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DESENVOLVEDOR, PIZZARIA_INFO } from '../../data/pizzaria';
import { formatWhatsappNumber } from '../../lib/format';
import { LogoMark } from './Logo';

const QUICK_LINKS = [
  { to: '/', label: 'Página Inicial' },
  { to: '/cardapio', label: 'Cardápio Digital' },
  { to: '/sobre', label: 'Nossa História' },
  { to: '/contato', label: 'Localização e Contato' },
];

const PAYMENT_BADGES = [
  { label: 'PIX', title: 'PIX', className: 'text-teal-400 font-mono' },
  { label: 'R$', title: 'Dinheiro', className: 'text-emerald-400 font-mono' },
  { label: 'VISA', title: 'Cartão Visa', className: 'text-blue-400 italic' },
  { label: 'M/C', title: 'Cartão Mastercard', className: 'text-orange-400 italic' },
  { label: 'ELO', title: 'Cartão Elo', className: 'text-red-400 italic' },
];

const DEVELOPER_LINKS = [
  { href: DESENVOLVEDOR.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: DESENVOLVEDOR.github, label: 'GitHub', Icon: Github },
  { href: `mailto:${DESENVOLVEDOR.email}`, label: 'E-mail', Icon: Mail },
  { href: DESENVOLVEDOR.instagram, label: 'Instagram', Icon: Instagram },
];

const headingClass = 'mb-5 border-l-4 border-brand-red pl-3 text-xs font-black uppercase tracking-[0.2em] text-white';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-dark pb-8 pt-14 text-stone-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="text-lg font-black uppercase italic tracking-tighter text-white">Forno de Pedra</span>
          </Link>
          <p className="text-sm leading-relaxed text-stone-400">
            Sabor ancestral assado a lenha. Massas de fermentação natural de 48h com ingredientes selecionados e molho
            de tomate fresco.
          </p>
          <div className="flex gap-3 text-[11px] font-black uppercase tracking-widest">
            <span className="text-red-400">Desde {PIZZARIA_INFO.origemAno}</span>
            <span className="text-stone-600" aria-hidden="true">|</span>
            <span className="text-stone-400">100% Artesanal</span>
          </div>

          <a
            href={DESENVOLVEDOR.site}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-stone-900 p-3 transition-colors hover:border-white/10 hover:bg-stone-800"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
              <Code className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-bold text-white">Voltar ao site do Dev</span>
              <span className="block text-[11px] text-stone-400">Voltar ao site do Desenvolvedor Gustavo</span>
            </span>
          </a>
        </div>

        <div>
          <h2 className={headingClass}>Acesso Rápido</h2>
          <ul className="space-y-3 text-sm font-medium">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-red-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Fale Conosco</h2>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
              <span className="leading-snug">{PIZZARIA_INFO.endereco}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
              <span>{formatWhatsappNumber(PIZZARIA_INFO.telefoneWhats)}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
              <span>
                <span className="mb-1 block text-xs font-black uppercase tracking-wider text-red-400">Funcionamento:</span>
                {PIZZARIA_INFO.funcionamento}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Formas de Pagamento</h2>
          <p className="mb-4 flex items-start gap-1.5 border border-white/5 bg-stone-900 p-3 text-xs leading-relaxed text-stone-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            <span>Pague somente na entrega ou retirada de forma 100% segura.</span>
          </p>
          <ul className="grid grid-cols-5 gap-1.5">
            {PAYMENT_BADGES.map((badge) => (
              <li
                key={badge.title}
                title={badge.title}
                aria-label={badge.title}
                className={`flex items-center justify-center border border-white/5 bg-stone-900 py-2 text-[11px] font-black ${badge.className}`}
              >
                {badge.label}
              </li>
            ))}
          </ul>
          <span className="mt-3 block font-mono text-[11px] text-stone-400">
            *Não aceitamos cheques ou moedas estrangeiras.
          </span>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/5 px-4 pt-8 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <div className="space-y-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
          <p>© {new Date().getFullYear()} {PIZZARIA_INFO.nome}. Todos os direitos reservados.</p>
          <p className="normal-case tracking-normal text-amber-400">
            Website demonstrativo de portfólio: pizzaria, pedidos e depoimentos são fictícios.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-stone-950 px-4 py-2.5 sm:flex-row">
          <span className="text-xs text-stone-400">
            Desenvolvido por <strong className="font-bold text-white">{DESENVOLVEDOR.nome}</strong>
          </span>
          <div className="flex gap-1">
            {DEVELOPER_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center text-stone-300 transition-colors hover:text-amber-400"
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
