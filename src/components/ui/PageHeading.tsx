interface PageHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <header className="space-y-3 text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
      <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-stone-600">{description}</p>
    </header>
  );
}
