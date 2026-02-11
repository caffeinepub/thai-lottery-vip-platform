import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Wallet } from 'lucide-react';
import { toast } from 'sonner';

export default function DepositPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate deposit processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Deposit Successful!', {
        description: `${parseFloat(amount).toFixed(2)} SAR has been added to your account.`,
      });

      setAmount('');
      setTimeout(() => {
        navigate({ to: '/' });
      }, 2000);
    } catch (error) {
      toast.error('Deposit failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-slate-900 border-b border-gold flex items-center gap-4">
        <ArrowLeft className="w-6 h-6 text-gold cursor-pointer" onClick={() => navigate({ to: '/' })} />
        <h2 className="font-bold text-gold">DEPOSIT</h2>
      </header>

      <div className="p-4">
        <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-8 h-8 text-gold" />
            <h3 className="text-xl font-bold text-gold">Add Funds</h3>
          </div>
          <p className="text-sm text-gray-400">Deposit SAR to your gaming account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-2 uppercase">Amount (SAR)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-800 p-4 rounded-lg border border-gray-700 text-white text-2xl font-bold focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[100, 500, 1000, 2000, 5000, 10000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset.toString())}
                className="py-2 px-4 bg-slate-800 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-all"
              >
                {preset}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-black uppercase bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50 mt-6"
          >
            {isSubmitting ? 'Processing...' : 'Deposit Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
