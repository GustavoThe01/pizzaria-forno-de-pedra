import { useState, type ImgHTMLAttributes } from 'react';

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e7e5e4'/%3E%3Ccircle cx='200' cy='150' r='60' fill='%23c23b22'/%3E%3Crect x='178' y='128' width='44' height='44' fill='%23faf9f6' transform='rotate(45 200 150)'/%3E%3C/svg%3E";

/** Imagem com carregamento adiado e marca da pizzaria caso a URL externa falhe. */
export function FallbackImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSrc, setFailedSrc] = useState<string>();

  return (
    <img
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      {...props}
      src={failedSrc === src ? PLACEHOLDER : src}
      alt={alt}
      onError={() => setFailedSrc(src)}
    />
  );
}
