import type { ReactNode } from 'react';

interface ChoiceButtonProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

/** Botão de seleção única: tamanho, borda, tipo de entrega e pagamento. */
export function ChoiceButton({ selected, onClick, children, className = '' }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`border-2 text-left transition-colors ${
        selected ? 'border-brand-red bg-brand-red/5' : 'border-brand-dark/15 hover:bg-stone-50'
      } ${className}`}
    >
      {children}
    </button>
  );
}
