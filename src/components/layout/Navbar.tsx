import { Clock, Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrdersContext';
import { PIZZARIA_INFO } from '../../data/pizzaria';
import { getItemCount, isPizzariaOpen } from '../../lib/order';
import { LogoMark } from './Logo';

const NAV_LINKS = [
  { path: '/', label: 'Início' },
  { path: '/cardapio', label: 'Cardápio' },
  { path: '/sobre', label: 'Nossa História' },
  { path: '/contato', label: 'Contato & Mapa' },
];

export function Navbar() {
  const { carrinho } = useCart();
  const { pedidos } = useOrders();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItens = getItemCount(carrinho);
  const pedidoAtivo = pedidos.find((pedido) => pedido.status !== 'entregue');
  const statusAbertura = isPizzariaOpen() ? 'Forno aceso!' : 'Fechado agora';

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-dark/10 bg-brand-bg/95 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-center gap-2 bg-brand-dark px-4 py-1.5 text-center font-mono text-[11px] uppercase tracking-wider text-brand-bg sm:text-xs sm:tracking-widest">
        <Clock className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
        <span className="sm:hidden">
          {PIZZARIA_INFO.funcionamentoCurto} · {statusAbertura}
        </span>
        <span className="hidden sm:inline">
          {PIZZARIA_INFO.funcionamento} — {statusAbertura}
        </span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${PIZZARIA_INFO.nome}, página inicial`}>
          <LogoMark className="h-9 w-9 shadow-brand-sm sm:h-10 sm:w-10" />
          <span className="min-w-0">
            <span className="block truncate text-lg font-black uppercase italic tracking-tighter sm:text-2xl">
              Forno de Pedra
            </span>
            <span className="-mt-1 block truncate font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-red">
              Pizzaria Artesanal
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.15em] lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              aria-current={isActive(link.path) ? 'page' : undefined}
              className={`whitespace-nowrap border-b-2 py-1 transition-colors hover:text-brand-red ${
                isActive(link.path) ? 'border-brand-red font-black text-brand-red' : 'border-transparent text-brand-dark/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {pedidoAtivo && (
            <Link
              to={`/pedido/${pedidoAtivo.id}`}
              className="hidden items-center gap-2 whitespace-nowrap bg-brand-green px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-brand-sm transition-colors hover:bg-brand-dark lg:flex"
            >
              <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
              Rastrear Pedido
            </Link>
          )}

          <Link
            to="/carrinho"
            aria-label={`Carrinho, ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
            className="relative flex h-11 w-11 items-center justify-center bg-brand-dark text-white shadow-brand-sm transition-colors hover:bg-brand-red"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {totalItens > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 animate-scale-in items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-black text-white shadow-md">
                {totalItens}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center bg-brand-dark text-white shadow-brand-sm transition-colors hover:bg-brand-red lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-menu" aria-label="Menu móvel" className="space-y-1 border-t border-brand-dark/10 bg-brand-bg px-4 pb-5 pt-2 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              aria-current={isActive(link.path) ? 'page' : undefined}
              className={`block border-l-4 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                isActive(link.path)
                  ? 'border-brand-red bg-brand-red/5 text-brand-red'
                  : 'border-transparent text-brand-dark/80 hover:bg-brand-dark/5 hover:text-brand-red'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {pedidoAtivo && (
            <Link
              to={`/pedido/${pedidoAtivo.id}`}
              className="mt-3 block bg-brand-green px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-white shadow-brand-sm"
            >
              Rastrear Pedido: {pedidoAtivo.id}
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
