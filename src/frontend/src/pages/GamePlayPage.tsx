import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useActor } from '../hooks/useActor';
import { GameType, PlayType } from '../backend';

interface BetRow {
  number: string;
  amount: string;
}

export default function GamePlayPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/game-play' }) as { game?: string };
  const { actor } = useActor();
  const [playType, setPlayType] = useState<'DIRECT' | 'RUMBLE' | 'DOWN'>('DIRECT');
  const [betRows, setBetRows] = useState<BetRow[]>([
    { number: '', amount: '' },
    { number: '', amount: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gameName = search.game || 'GAME PLAY';
  const balance = 5420.0;

  const updateBetRow = (index: number, field: 'number' | 'amount', value: string) => {
    const newRows = [...betRows];
    newRows[index][field] = value;
    setBetRows(newRows);
  };

  const calculateTotal = () => {
    return betRows.reduce((sum, row) => {
      const amount = parseFloat(row.amount) || 0;
      return sum + amount;
    }, 0);
  };

  const handleSubmit = async () => {
    const validBets = betRows.filter((row) => row.number && row.amount);
    if (validBets.length === 0) {
      toast.error('Please enter at least one bet');
      return;
    }

    setIsSubmitting(true);
    try {
      if (actor) {
        const gameType: GameType =
          gameName.includes('BANGKOK') ? GameType.bangkokWeekly : GameType.thailandLottery;
        const pType: PlayType = playType === 'DIRECT' ? PlayType.vip : PlayType.rumble;

        for (const bet of validBets) {
          await actor.submitBet(bet.number, BigInt(Math.floor(parseFloat(bet.amount))), pType, gameType);
        }
      }

      toast.success('Bet Successful', {
        description: 'Your bet has been placed successfully!',
      });

      setTimeout(() => {
        navigate({ to: '/' });
      }, 1500);
    } catch (error) {
      toast.error('Bet failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();
  const discount = 0;
  const final = total - discount;

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-slate-900 border-b border-gold flex items-center gap-4">
        <ArrowLeft className="w-6 h-6 text-gold cursor-pointer" onClick={() => navigate({ to: '/' })} />
        <div>
          <h2 className="font-bold text-gold">{gameName}</h2>
          <p className="text-xs text-green-500">Balance: {balance.toFixed(2)} SAR</p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <div className="bg-white/5 border border-gold/30 rounded-xl p-4">
          <label className="text-xs text-gray-400 block mb-2 uppercase">Select Play Type</label>
          <select
            value={playType}
            onChange={(e) => setPlayType(e.target.value as any)}
            className="w-full bg-slate-800 border border-gold/50 p-3 rounded-lg text-white focus:outline-none focus:border-gold"
          >
            <option value="DIRECT">DIRECT (3D)</option>
            <option value="RUMBLE">RUMBLE (3D)</option>
            <option value="DOWN">DOWN (2D)</option>
          </select>
        </div>

        <div className="space-y-3">
          {betRows.map((row, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="number"
                inputMode="numeric"
                placeholder="Number"
                value={row.number}
                onChange={(e) => updateBetRow(index, 'number', e.target.value)}
                className="w-2/3 bg-slate-800 p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gold"
              />
              <input
                type="number"
                inputMode="decimal"
                placeholder="SAR"
                value={row.amount}
                onChange={(e) => updateBetRow(index, 'amount', e.target.value)}
                className="w-1/3 bg-slate-800 p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gold"
              />
            </div>
          ))}
        </div>

        <div className="bg-black/50 p-4 rounded-lg space-y-2 border-t border-gold mt-10">
          <div className="flex justify-between text-sm">
            <span>Bet Total:</span>
            <span>{total.toFixed(2)} SAR</span>
          </div>
          <div className="flex justify-between text-sm text-gold">
            <span>Discount:</span>
            <span>{discount.toFixed(2)} SAR</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t border-gray-800 pt-2">
            <span>Final:</span>
            <span>{final.toFixed(2)} SAR</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl font-black uppercase text-xl mt-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Bet'}
        </button>
      </div>
    </div>
  );
}
