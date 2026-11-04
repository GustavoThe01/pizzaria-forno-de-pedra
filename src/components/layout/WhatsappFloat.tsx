import { MessageSquareDot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWhatsappUrl } from '../../lib/whatsapp';

const WHATSAPP_URL = getWhatsappUrl('Olá! Gostaria de tirar uma dúvida sobre o cardápio da Pizzaria Forno de Pedra.');

export function WhatsappFloat() {
  const [footerVisible, setFooterVisible] = useState(false);

  // Oculta o botão quando o rodapé aparece, para não cobrir os links dele.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Fale conosco no WhatsApp"
      aria-label="Fale conosco no WhatsApp"
      tabIndex={footerVisible ? -1 : undefined}
      className={`group fixed bottom-5 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-600 active:scale-95 sm:bottom-6 sm:right-6 ${
        footerVisible ? 'pointer-events-none translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-stone-800 bg-stone-900 px-3 py-1.5 font-mono text-xs font-medium text-stone-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Dúvidas? Chame aqui! 💬
      </span>
      <MessageSquareDot className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
