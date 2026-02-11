import { useRef } from 'react';
import { VIP_WINNERS } from '../../constants/homeContent';

export default function VipWinnersTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-64 overflow-hidden bg-black/30 rounded-xl border border-gold/30">
      <div ref={trackRef} className="flex flex-col animate-scroll-winners">
        {[...VIP_WINNERS, ...VIP_WINNERS].map((winner, index) => (
          <div
            key={index}
            className="p-3 border-b border-white/5 flex items-center gap-3 hover:bg-white/5 transition-colors"
          >
            <img
              src="https://flagcdn.com/w40/sa.png"
              alt="Saudi Flag"
              className="w-6 h-4 object-cover rounded-sm"
            />
            <div className="flex-1">
              <p className="text-[11px] font-bold text-white uppercase">{winner.name}</p>
              <p className="text-[9px] text-gray-500">{winner.phone}</p>
            </div>
            <p className="text-green-500 font-bold text-xs">{winner.amount.toLocaleString()} SAR</p>
          </div>
        ))}
      </div>
    </div>
  );
}
