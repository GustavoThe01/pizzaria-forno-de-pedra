import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  label: string;
  onDecrease: () => void;
  onIncrease: () => void;
}

const buttonClass =
  'flex h-10 w-10 items-center justify-center bg-white text-brand-dark transition-colors hover:bg-brand-red hover:text-white disabled:cursor-not-allowed disabled:text-stone-300 disabled:hover:bg-white';

export function QuantityStepper({ value, label, onDecrease, onIncrease }: QuantityStepperProps) {
  return (
    <div className="flex items-center border-2 border-brand-dark" role="group" aria-label={`Quantidade de ${label}`}>
      <button type="button" onClick={onDecrease} disabled={value <= 1} aria-label="Diminuir quantidade" className={buttonClass}>
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span aria-live="polite" className="w-9 text-center font-mono text-sm font-black">
        {value}
      </span>
      <button type="button" onClick={onIncrease} aria-label="Aumentar quantidade" className={buttonClass}>
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
