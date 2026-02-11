import { useEffect, useState } from 'react';

const INFO_LINES = [
  'Official Thai Lottery Platform',
  'Fast & Secure Result System',
  'Trusted VIP Gaming Experience',
];

export default function InfoBanner() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    INFO_LINES.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, index * 500);
    });
  }, []);

  return (
    <div className="relative bg-blue-900/30 border-y border-blue-500/50 overflow-hidden">
      <img
        src="/assets/generated/info-banner-bg.dim_1200x260.png"
        alt="Info Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative p-4 text-center text-sm space-y-1">
        {INFO_LINES.map((line, index) => (
          <p
            key={index}
            className={`transition-all duration-700 ${
              visibleLines.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
