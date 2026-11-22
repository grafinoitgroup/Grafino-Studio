import { useState } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function EditorialImage({ src, alt, className = '' }: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-[#161616] text-[#9CA3AF] p-6 text-center ${className}`}
      >
        <span className="font-mono-tech text-[10px]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
