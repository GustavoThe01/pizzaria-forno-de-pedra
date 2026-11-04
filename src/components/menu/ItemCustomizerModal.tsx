import { ShoppingCart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BORDA_PADRAO_ID, TAMANHOS } from '../../data/menu';
import { formatCurrency } from '../../lib/format';
import { getBordasFor, isPizza, type MenuEntry } from '../../lib/menu';
import type { CartItem, TamanhoId } from '../../types';
import { ChoiceButton } from '../ui/ChoiceButton';
import { FallbackImage } from '../ui/FallbackImage';
import { QuantityStepper } from '../ui/QuantityStepper';

interface ItemCustomizerModalProps {
  entry: MenuEntry;
  onClose: () => void;
  onConfirm: (item: Omit<CartItem, 'cartId'>) => void;
}

const stepTitleClass = 'text-xs font-black uppercase tracking-wider text-brand-dark';

export function ItemCustomizerModal({ entry: { sabor, categoriaId }, onClose, onConfirm }: ItemCustomizerModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pizza = isPizza(sabor);
  const tamanhos = TAMANHOS.filter((tamanho) => sabor.precos[tamanho.id] !== undefined);
  const bordas = getBordasFor(categoriaId);

  const [tamanhoId, setTamanhoId] = useState<TamanhoId>(
    tamanhos.some((tamanho) => tamanho.id === 'grande') ? 'grande' : (tamanhos[0]?.id ?? 'media'),
  );
  const [bordaId, setBordaId] = useState(BORDA_PADRAO_ID);
  const [quantidade, setQuantidade] = useState(1);

  // <dialog> nativo já resolve foco, tecla Esc e bloqueio do conteúdo de fundo.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const tamanhoAtual = tamanhos.find((tamanho) => tamanho.id === tamanhoId);
  const bordaAtual = pizza ? bordas.find((borda) => borda.id === bordaId) : undefined;
  const precoBase = (pizza ? sabor.precos[tamanhoId] : sabor.precos.unidade) ?? 0;
  const precoUnitario = precoBase + (bordaAtual?.preco ?? 0);

  const handleConfirm = () => {
    onConfirm({
      saborId: sabor.id,
      nomeSabor: sabor.nome,
      tamanho: tamanhoAtual ? `${tamanhoAtual.nome} (${tamanhoAtual.fatias} fatias)` : 'Unidade',
      borda:
        bordaAtual && bordaAtual.id !== BORDA_PADRAO_ID
          ? { id: bordaAtual.id, nome: bordaAtual.nome, preco: bordaAtual.preco }
          : null,
      quantidade,
      precoUnitario,
      imagem: sabor.imagem,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
      aria-labelledby="customizer-title"
      className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-lg animate-scale-in overflow-hidden border-2 border-brand-dark bg-white p-0 text-brand-dark shadow-brand backdrop:bg-brand-dark/80 backdrop:backdrop-blur-sm open:flex open:flex-col sm:max-h-[88dvh]"
    >
      <div className="relative h-28 shrink-0 bg-stone-900 sm:h-36">
        <FallbackImage src={sabor.imagem} alt="" loading="eager" className="h-full w-full object-cover opacity-60" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-brand-dark text-white shadow-brand-sm transition-colors hover:bg-brand-red"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="absolute bottom-3 left-4 right-14 text-white">
          <span className="mb-0.5 block font-mono text-[10px] font-black uppercase tracking-widest text-amber-400">
            Personalização
          </span>
          <h2 id="customizer-title" className="text-lg font-black uppercase italic leading-tight tracking-tighter sm:text-2xl">
            {sabor.nome}
          </h2>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
        <p className="text-sm font-medium leading-relaxed text-stone-600">{sabor.descricao}</p>

        {pizza && (
          <>
            <section className="space-y-2">
              <h3 className={stepTitleClass}>1. Selecione o tamanho:</h3>
              <div className="grid grid-cols-2 gap-2">
                {tamanhos.map((tamanho) => (
                  <ChoiceButton key={tamanho.id} selected={tamanhoId === tamanho.id} onClick={() => setTamanhoId(tamanho.id)} className="p-3">
                    <span className="block text-xs font-black uppercase tracking-wider">{tamanho.nome}</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-stone-600">({tamanho.fatias} fatias)</span>
                    <span className="mt-1.5 block font-mono text-xs font-black">
                      {formatCurrency(sabor.precos[tamanho.id] ?? 0)}
                    </span>
                  </ChoiceButton>
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className={stepTitleClass}>2. Escolha a borda:</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {bordas.map((borda) => (
                  <ChoiceButton key={borda.id} selected={bordaId === borda.id} onClick={() => setBordaId(borda.id)} className="px-3 py-2.5">
                    <span className="block text-[11px] font-black uppercase tracking-wider">{borda.nome}</span>
                    <span className="mt-0.5 block font-mono text-[11px] font-bold text-stone-600">
                      {borda.preco > 0 ? `+ ${formatCurrency(borda.preco)}` : 'Inclusa'}
                    </span>
                  </ChoiceButton>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="flex items-center justify-between gap-3 border-t-2 border-brand-dark/10 pt-4">
          <span className={stepTitleClass}>{pizza ? '3. Quantidade:' : 'Quantidade:'}</span>
          <QuantityStepper
            value={quantidade}
            label={sabor.nome}
            onDecrease={() => setQuantidade((value) => Math.max(1, value - 1))}
            onIncrease={() => setQuantidade((value) => value + 1)}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 border-t-2 border-brand-dark/10 bg-brand-bg p-4">
        <div>
          <span className="block font-mono text-[10px] font-bold uppercase leading-tight text-stone-500">Valor do item</span>
          <span className="whitespace-nowrap font-mono text-base font-black text-brand-red sm:text-lg">
            {formatCurrency(precoUnitario * quantidade)}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onClose}
            className="hidden px-3 py-3 text-xs font-black uppercase tracking-wider text-stone-600 transition-colors hover:bg-stone-200 sm:block"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-1.5 whitespace-nowrap bg-brand-red px-4 py-3 text-xs font-black uppercase tracking-widest text-white shadow-brand-sm transition-colors hover:bg-brand-dark"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            Confirmar
          </button>
        </div>
      </div>
    </dialog>
  );
}
