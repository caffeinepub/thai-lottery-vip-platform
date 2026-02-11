import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useActor } from '../hooks/useActor';
import { GameType, PlayType } from '../backend';

export default function TicketBookingPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    userName: '',
    contactNumber: '',
    ticketType: 'VIP Ticket',
    bookingDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userName || !formData.contactNumber || !formData.bookingDate) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      if (actor) {
        const gameType: GameType = GameType.thailandLottery;
        const playType: PlayType =
          formData.ticketType === 'VIP Ticket'
            ? PlayType.vip
            : formData.ticketType === 'Rumble Ticket'
            ? PlayType.rumble
            : PlayType.local;

        await actor.submitBooking(
          formData.userName,
          formData.contactNumber,
          gameType,
          playType,
          formData.bookingDate
        );
      }

      toast.success('Ticket Booking Confirmed!', {
        description: 'Processing your request...',
      });

      setTimeout(() => {
        navigate({ to: '/' });
      }, 2000);
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-slate-900 border-b border-gold flex items-center gap-4">
        <ArrowLeft className="w-6 h-6 text-gold cursor-pointer" onClick={() => navigate({ to: '/' })} />
        <h2 className="font-bold text-gold uppercase">VIP Ticket Booking</h2>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="User Name"
            required
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            className="w-full bg-slate-800 p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gold"
          />
          <input
            type="tel"
            placeholder="Contact Number"
            required
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="w-full bg-slate-800 p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gold"
          />
          <select
            value={formData.ticketType}
            onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
            className="w-full bg-slate-800 p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gold"
          >
            <option>VIP Ticket</option>
            <option>Rumble Ticket</option>
            <option>Local Ticket</option>
          </select>
          <input
            type="date"
            required
            value={formData.bookingDate}
            onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
            className="w-full bg-slate-800 p-4 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-black uppercase bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Booking...' : 'Book Ticket Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
