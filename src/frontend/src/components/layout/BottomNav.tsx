import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Home, Wallet, ArrowDownToLine } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/deposit', label: 'Deposit', icon: Wallet },
    { path: '/withdraw', label: 'Withdraw', icon: ArrowDownToLine },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0e14] border-t border-gold z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate({ to: item.path })}
              className={`flex flex-col items-center justify-center gap-1 px-6 py-2 transition-colors ${
                isActive ? 'text-gold' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] uppercase font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
