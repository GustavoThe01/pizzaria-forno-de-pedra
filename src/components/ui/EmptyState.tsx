import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

/** Tela de estado vazio ou de erro, com as ações em `children`. */
export function EmptyState({ Icon, eyebrow, title, description, children }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-xl animate-fade-in space-y-6 px-4 py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-red/10 text-brand-red shadow-brand-sm">
        <Icon className="h-10 w-10" aria-hidden="true" />
      </div>
      <div className="space-y-3">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="section-title text-2xl sm:text-3xl">{title}</h1>
        <p className="mx-auto max-w-sm text-sm font-medium leading-relaxed text-stone-600">{description}</p>
      </div>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">{children}</div>
    </div>
  );
}
