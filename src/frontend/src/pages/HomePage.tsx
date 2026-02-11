import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Menu, RefreshCw, Smartphone, Crown, Dice1, Star, Ticket, History } from 'lucide-react';
import LiveResultCard from '../components/home/LiveResultCard';
import InfoBanner from '../components/home/InfoBanner';
import VipWinnersTicker from '../components/home/VipWinnersTicker';
import { GAME_RATES } from '../constants/homeContent';

export default function HomePage() {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);

  const handlePlayNow = (gameName: string) => {
    navigate({ to: '/game-play', search: { game: gameName } });
  };

  const handleResultsHistory = (type: 'thai' | 'bangkok') => {
    navigate({ to: '/results', search: { type } });
  };

  const handleOldResults = () => {
    navigate({ to: '/results', search: { type: 'all' } });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-4 bg-slate-900 flex justify-between items-center border-b border-gold">
        <Menu className="w-6 h-6 text-gold" />
        <h1 className="text-xl font-bold tracking-widest text-gold">THAI LOTTERY</h1>
        <div className="flex gap-4">
          <RefreshCw className="w-5 h-5 text-gold cursor-pointer" onClick={() => window.location.reload()} />
          <Smartphone className="w-5 h-5 text-gold" />
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
        <img
          src="/assets/generated/thai-lottery-hero.dim_1200x700.png"
          alt="Thai Lottery Hero"
          className="w-full h-full object-cover opacity-60"
          onLoad={() => setHeroLoaded(true)}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
          <h2
            className={`text-2xl font-bold text-gold text-center px-4 transition-all duration-1000 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            THAI LOTTERY – OFFICIAL LIVE RESULT
          </h2>
        </div>
      </div>

      {/* Info Banner */}
      <InfoBanner />

      {/* Quick Results */}
      <div className="p-4 space-y-4">
        <LiveResultCard
          title="BANGKOK WEEKLY RESULT"
          numbers={['3', '0', '8']}
          onPlayNow={() => handlePlayNow('BANGKOK WEEKLY')}
        />
        <LiveResultCard
          title="THAILAND LOTTERY"
          numbers={['6', '2', '9']}
          onPlayNow={() => handlePlayNow('THAILAND LOTTERY')}
          isHighlight
        />
      </div>

      {/* Game Rates Table */}
      <div className="px-4 mt-6">
        <h4 className="text-center text-gold font-bold mb-3 uppercase tracking-widest">Game Rates</h4>
        <div className="overflow-hidden rounded-lg border border-gold/30">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gold text-black">
              <tr className="text-sm">
                <th className="p-3 border-r border-yellow-700 font-bold">Game Name</th>
                <th className="p-3 border-r border-yellow-700 font-bold">Rate</th>
                <th className="p-3 font-bold">Discount</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900/80 text-sm">
              {GAME_RATES.map((rate, index) => (
                <tr key={index} className={index < GAME_RATES.length - 1 ? 'border-b border-gray-700' : ''}>
                  <td className="p-3">{rate.name}</td>
                  <td className="p-3">{rate.rate}</td>
                  <td className="p-3">{rate.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIP Winners */}
      <div className="p-4 mt-6">
        <h4 className="text-gold font-bold mb-3 uppercase flex items-center gap-2 italic">
          <Crown className="w-5 h-5" />
          Live VIP Winners
        </h4>
        <VipWinnersTicker />
      </div>

      {/* Quick Play Buttons */}
      <div className="p-4 mt-4 space-y-3">
        <button
          onClick={() => handlePlayNow('BANGKOK WEEKLY')}
          className="w-full p-4 bg-gradient-to-br from-gray-900 to-gray-950 border border-gold/30 rounded-2xl flex items-center justify-between hover:border-gold transition-all shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gold rounded-xl flex items-center justify-center">
              <Dice1 className="w-6 h-6 text-black" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-sm">BANGKOK WEEKLY PLAY</p>
              <p className="text-[9px] text-green-500">Official Server</p>
            </div>
          </div>
          <div className="text-gold">›</div>
        </button>

        <button
          onClick={() => handlePlayNow('THAILAND LOTTERY')}
          className="w-full p-4 bg-gradient-to-br from-gray-900 to-gray-950 border border-gold/30 rounded-2xl flex items-center justify-between hover:border-gold transition-all shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gold rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-black" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-sm">THAI LOTTERY PLAY</p>
              <p className="text-[9px] text-green-500">100% Secure GLO</p>
            </div>
          </div>
          <div className="text-gold">›</div>
        </button>

        <button
          onClick={() => navigate({ to: '/ticket-booking' })}
          className="w-full p-4 bg-gradient-to-br from-gray-900 to-gray-950 border border-gold/30 rounded-2xl flex items-center justify-between hover:border-gold transition-all shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gold rounded-xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-black" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-sm">TICKET BOOKING</p>
              <p className="text-[9px] text-green-500">VIP Entry</p>
            </div>
          </div>
          <div className="text-gold">›</div>
        </button>

        <button
          onClick={() => handleResultsHistory('thai')}
          className="w-full p-4 bg-gradient-to-br from-gray-900 to-gray-950 border border-gold/30 rounded-2xl flex items-center justify-between hover:border-gold transition-all shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gold rounded-xl flex items-center justify-center">
              <History className="w-6 h-6 text-black" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-sm">THAI RESULTS HISTORY</p>
              <p className="text-[9px] text-green-500">Official Archive</p>
            </div>
          </div>
          <div className="text-gold">›</div>
        </button>

        <button
          onClick={() => handleResultsHistory('bangkok')}
          className="w-full p-4 bg-gradient-to-br from-gray-900 to-gray-950 border border-gold/30 rounded-2xl flex items-center justify-between hover:border-gold transition-all shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gold rounded-xl flex items-center justify-center">
              <History className="w-6 h-6 text-black" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-sm">BANGKOK RESULTS HISTORY</p>
              <p className="text-[9px] text-green-500">Official Archive</p>
            </div>
          </div>
          <div className="text-gold">›</div>
        </button>
      </div>

      {/* Old Result Button */}
      <div className="p-4 pb-8">
        <button
          onClick={handleOldResults}
          className="w-full py-4 border-2 border-gold text-gold font-black italic uppercase rounded-xl hover:bg-gold hover:text-black transition-all"
        >
          VIP PRO: Old Result / History
        </button>
      </div>
    </div>
  );
}
