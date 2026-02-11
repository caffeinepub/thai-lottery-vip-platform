import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowDownToLine } from 'lucide-react';
import { toast } from 'sonner';

export default function WithdrawPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const balance = 5420.0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const withdrawAmount = parseFloat(amount);
    if (!amount || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (withdrawAmount > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate withdrawal processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Withdrawal Successful!', {
        description: `${withdrawAmount.toFixed(2)} SAR will be transferred to your account.`,
      });

      setAmount('');
      setTimeout(() => {
        navigate({ to: '/' });
      }, 2000);
    } catch (error) {
      toast.error('Withdrawal failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-slate-900 border-b border-gold flex items-center gap-4">
        <ArrowLeft className="w-6 h-6 text-gold cursor-pointer" onClick={() => navigate({ to: '/' })} />
        <h2 className="font-bold text-gold">WITHDRAW</h2>
      </header>

      <div className="p-4">
        <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <ArrowDownToLine className="w-8 h-8 text-gold" />
            <h3 className="text-xl font-bold text-gold">Withdraw Funds</h3>
          </div>
          <p className="text-sm text-gray-400">Available Balance: {balance.toFixed(2)} SAR</p>
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
            {[100, 500, 1000, 2000, 5000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset.toString())}
                disabled={preset > balance}
                className="py-2 px-4 bg-slate-800 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-all disabled:opacity-30"
              >
                {preset}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAmount(balance.toString())}
              className="py-2 px-4 bg-slate-800 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-all"
            >
              Max
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-black uppercase bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50 mt-6"
          >
            {isSubmitting ? 'Processing...' : 'Withdraw Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
