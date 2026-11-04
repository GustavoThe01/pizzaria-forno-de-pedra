/** Marca reutilizada no cabeçalho e no rodapé. */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-brand-red ${className}`} aria-hidden="true">
      <span className="h-[40%] w-[40%] rotate-45 bg-brand-bg" />
    </span>
  );
}
