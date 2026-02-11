interface LiveResultCardProps {
  title: string;
  numbers: string[];
  onPlayNow: () => void;
  isHighlight?: boolean;
}

export default function LiveResultCard({ title, numbers, onPlayNow, isHighlight }: LiveResultCardProps) {
  return (
    <div className="bg-white/5 border border-gold/30 rounded-xl p-5 relative overflow-hidden backdrop-blur-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-red-500 font-bold flex items-center gap-2 animate-pulse">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          LIVE
        </span>
        <h3 className={`font-semibold ${isHighlight ? 'text-gold' : 'text-white'} uppercase text-sm`}>{title}</h3>
      </div>
      <div className="flex justify-center gap-4 my-4">
        {numbers.map((num, index) => (
          <span
            key={index}
            className="bg-white text-black w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold shadow-lg"
          >
            {num}
          </span>
        ))}
      </div>
      <button
        onClick={onPlayNow}
        className="w-full py-3 rounded-lg font-bold uppercase shadow-lg bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black hover:shadow-gold/50 transition-all"
      >
        Play Now
      </button>
    </div>
  );
}
