import { Clock, Compass, MapPin, MessageSquare, Phone, Send, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { FallbackImage } from '../components/ui/FallbackImage';
import { PageHeading } from '../components/ui/PageHeading';
import { PIZZARIA_INFO } from '../data/pizzaria';
import { formatWhatsappNumber } from '../lib/format';
import { getMapsUrl, getWhatsappUrl } from '../lib/whatsapp';

function InfoItem({ Icon, title, tone, children }: { Icon: LucideIcon; title: string; tone: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center ${tone}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <span className="block text-xs font-black uppercase tracking-wider text-brand-dark">{title}</span>
        <div className="mt-0.5 text-sm leading-relaxed text-stone-600">{children}</div>
      </div>
    </li>
  );
}

export default function Contato() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8">
      <PageHeading
        eyebrow="Atendimento e Localização"
        title="Fale Conosco"
        description="Estamos localizados na Cidade 2000, em Fortaleza. Entre em contato para tirar dúvidas ou agendar eventos."
      />

      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12">
        <section className="card space-y-6 p-5 sm:p-8 md:col-span-5">
          <h2 className="panel-title">Informações Gerais</h2>

          <ul className="space-y-6 font-medium">
            <InfoItem Icon={MapPin} title="Onde Estamos:" tone="bg-brand-red/10 text-brand-red">
              {PIZZARIA_INFO.endereco}
            </InfoItem>
            <InfoItem Icon={Phone} title="Atendimento Direto:" tone="bg-brand-green/10 text-brand-green">
              {formatWhatsappNumber(PIZZARIA_INFO.telefoneWhats)}
            </InfoItem>
            <InfoItem Icon={Clock} title="Horário de Funcionamento:" tone="bg-brand-red/10 text-brand-red">
              {PIZZARIA_INFO.funcionamento}
              <span className="mt-1.5 block font-mono text-[11px] font-black uppercase tracking-wider text-brand-red">
                *Segunda-feira: Forno fechado para manutenção
              </span>
            </InfoItem>
          </ul>

          <a
            href={getWhatsappUrl('Olá! Gostaria de tirar uma dúvida sobre a Pizzaria.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-brand-green py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-brand-sm transition-colors hover:bg-brand-dark"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Iniciar WhatsApp
          </a>
        </section>

        <section className="card p-4 sm:p-6 md:col-span-7">
          <div className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden border border-stone-200 bg-stone-100 p-4 sm:p-6">
            <FallbackImage
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-15 grayscale"
            />
            <div className="relative max-w-sm space-y-4 border-2 border-brand-dark bg-white/95 p-5 text-center shadow-brand-sm backdrop-blur-sm sm:p-6">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <Compass className="h-5 w-5 animate-spin-slow" aria-hidden="true" />
              </span>
              <div>
                <h2 className="mb-1 text-sm font-black uppercase text-brand-dark">Como Chegar</h2>
                <p className="text-sm font-medium leading-relaxed text-stone-600">
                  Estamos na Avenida Central da Cidade 2000, nº 1420. Amplo estacionamento e acessibilidade garantida.
                </p>
              </div>
              <a
                href={getMapsUrl(PIZZARIA_INFO.endereco)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-dark px-4 py-3 text-[11px] font-black uppercase tracking-wider text-white shadow-brand-sm transition-colors hover:bg-brand-red"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Abrir Google Maps
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
