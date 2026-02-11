import { RouterProvider, createRouter, createRoute, createRootRoute, Navigate } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import GamePlayPage from './pages/GamePlayPage';
import ResultsPage from './pages/ResultsPage';
import TicketBookingPage from './pages/TicketBookingPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const gamePlayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game-play',
  component: GamePlayPage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results',
  component: ResultsPage,
});

const ticketBookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ticket-booking',
  component: TicketBookingPage,
});

const depositRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deposit',
  component: DepositPage,
});

const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/withdraw',
  component: WithdrawPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <Navigate to="/" />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  gamePlayRoute,
  resultsRoute,
  ticketBookingRoute,
  depositRoute,
  withdrawRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
