import Image from 'next/image';

export default function EditorialImage({ asset, language, variant = 'landscape' }) {
  if (!asset) return null;
  const alt = asset.alt?.[language];
  if (!asset.src?.startsWith('/') || asset.src.startsWith('//') || !asset.width || !asset.height || !alt) return null;
  return <figure className={`editorialImage editorialImage--${variant}`}>
    <Image src={asset.src} alt={alt} width={asset.width} height={asset.height}
      sizes={variant === 'portrait' ? '(max-width: 600px) 88vw, (max-width: 900px) 560px, 34vw' : '92vw'} />
  </figure>;
}
