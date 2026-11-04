import { Bike, Store } from 'lucide-react';
import type { TipoEntrega } from '../../types';
import { ChoiceButton } from './ChoiceButton';

const OPTIONS = [
  { id: 'delivery', label: 'Delivery', Icon: Bike },
  { id: 'retirada', label: 'Retirada', Icon: Store },
] as const;

interface DeliveryTypeSelectorProps {
  value: TipoEntrega;
  onChange: (value: TipoEntrega) => void;
}

export function DeliveryTypeSelector({ value, onChange }: DeliveryTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {OPTIONS.map(({ id, label, Icon }) => (
        <ChoiceButton
          key={id}
          selected={value === id}
          onClick={() => onChange(id)}
          className={`flex items-center justify-center gap-2 py-3.5 text-xs font-black uppercase tracking-wider ${
            value === id ? 'text-brand-red' : 'text-stone-600'
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </ChoiceButton>
      ))}
    </div>
  );
}
