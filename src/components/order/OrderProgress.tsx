import { Bike, CheckCircle2, ClipboardCheck, CookingPot, Store, type LucideIcon } from 'lucide-react';
import type { OrderStage } from '../../data/order';
import type { OrderStatus, TipoEntrega } from '../../types';

const ICONS: Record<OrderStatus, LucideIcon> = {
  recebido: ClipboardCheck,
  preparando: CookingPot,
  saiu_para_entrega: Bike,
  entregue: CheckCircle2,
};

interface OrderProgressProps {
  stages: OrderStage[];
  currentIndex: number;
  tipoEntrega: TipoEntrega;
}

export function OrderProgress({ stages, currentIndex, tipoEntrega }: OrderProgressProps) {
  return (
    <ol className="relative mx-auto grid max-w-2xl grid-cols-4">
      {/* A linha vai do centro da primeira etapa ao centro da última (12,5% a 87,5%). */}
      <div className="absolute left-[12.5%] right-[12.5%] top-[18px] h-1 bg-stone-200" aria-hidden="true">
        <div
          className="h-full bg-brand-red transition-all duration-500"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
        />
      </div>

      {stages.map((stage, index) => {
        const Icon = stage.status === 'saiu_para_entrega' && tipoEntrega === 'retirada' ? Store : ICONS[stage.status];
        const reached = index <= currentIndex;
        const current = index === currentIndex;

        return (
          <li key={stage.status} aria-current={current ? 'step' : undefined} className="relative flex flex-col items-center">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-dark transition-colors ${
                reached ? 'bg-brand-red text-white shadow-brand-sm' : 'bg-stone-100 text-stone-500'
              } ${current ? 'ring-4 ring-brand-red/15' : ''}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className={`mt-2 text-center text-[10px] font-black uppercase leading-tight tracking-wide sm:text-[11px] ${reached ? 'text-brand-dark' : 'text-stone-500'}`}>
              {stage.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
