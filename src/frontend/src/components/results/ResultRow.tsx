import { Result } from '../../backend';

interface ResultRowProps {
  result: Result;
}

export default function ResultRow({ result }: ResultRowProps) {
  return (
    <div className="bg-white/5 border border-gold/30 rounded-xl p-4 flex justify-between items-center border-r-4 border-r-gold">
      <div>
        <p className="text-[10px] text-gray-400">{result.date}</p>
        <p className="font-bold text-gold">{result.gameName}</p>
        <p className="text-[10px] text-blue-400">{result.time}</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold tracking-widest text-white">{result.winningNumber}</p>
      </div>
    </div>
  );
}
