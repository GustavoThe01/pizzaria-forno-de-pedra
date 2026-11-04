import { Pizza } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { DESENVOLVEDOR } from '../../data/pizzaria';
import { STORAGE_KEYS } from '../../lib/storage';

export const hasAcceptedDisclaimer = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.disclaimerAccepted) === 'true';
  } catch {
    return false;
  }
};

export function PortfolioDisclaimer({ onAccept }: { onAccept: () => void }) {
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    acceptButtonRef.current?.focus({ preventScroll: true });
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.disclaimerAccepted, 'true');
    } catch {
      // Sem armazenamento, o aviso volta a aparecer na próxima visita.
    }
    onAccept();
  };

  return (
    <div className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-black/85 p-3 backdrop-blur-lg sm:p-5">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        aria-describedby="disclaimer-description"
        className="flex max-h-full w-full max-w-2xl animate-scale-in flex-col overflow-hidden rounded-3xl border border-brand-red/30 bg-[#150e0b] text-white shadow-2xl"
      >
        <header className="border-b border-white/5 px-5 pb-4 pt-6 text-center sm:px-9 sm:pb-5 sm:pt-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/15 px-4 py-1.5 text-xs font-semibold text-amber-400 sm:text-sm">
            <Pizza className="h-4 w-4 shrink-0" aria-hidden="true" />
            Website Demonstrativo / Portfólio
          </span>
          <h1 id="disclaimer-title" className="mt-3 font-serif text-xl font-bold leading-snug sm:text-2xl">
            Bem-vindo ao Website Pizzaria Forno de Pedra
          </h1>
        </header>

        <div
          id="disclaimer-description"
          tabIndex={0}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 text-sm leading-relaxed text-stone-300 sm:space-y-5 sm:px-9 sm:py-7 sm:text-[15px]"
        >
          <p>
            Este website foi desenvolvido com o propósito de apresentar um modelo de portal voltado para o segmento de
            pizzarias e delivery, servindo como demonstração de layout, funcionalidades, personalização e
            comercialização de serviços de criação de websites.
          </p>
          <p>
            O conteúdo apresentado neste portal possui caráter demonstrativo e foi criado para exemplificar soluções
            que podem ser adaptadas e customizadas de acordo com as necessidades de cada cliente e segmento de mercado.
          </p>
          <p>
            Este modelo foi desenvolvido por <strong className="text-white">{DESENVOLVEDOR.nome}</strong>, desenvolvedor
            Web Full Stack, como parte de seu portfólio profissional e catálogo de serviços.
          </p>
          <p className="rounded-r-xl border-l-4 border-brand-red bg-brand-red/10 px-4 py-3 text-stone-100">
            Ao prosseguir, você declara estar ciente de que este website tem finalidade de apresentação e demonstração
            de um modelo comercial personalizável para pizzarias.
          </p>
          <p className="border-t border-white/5 pt-4 text-center text-[15px] font-bold text-amber-400 sm:text-base">
            Você está ciente dessas informações e deseja continuar?
          </p>
        </div>

        <div className="flex flex-col-reverse justify-center gap-3 border-t border-white/5 bg-black/20 px-5 py-4 sm:flex-row sm:gap-4 sm:px-9 sm:py-6">
          <a
            href={DESENVOLVEDOR.site}
            className="rounded-full border border-white/20 px-7 py-3 text-center text-sm font-semibold text-stone-200 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white sm:min-w-44"
          >
            Não, sair
          </a>
          <button
            ref={acceptButtonRef}
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#a83019] sm:min-w-44"
          >
            Sim, desejo continuar
          </button>
        </div>
      </div>
    </div>
  );
}
