import { useEffect, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useActor } from '../hooks/useActor';
import { Result } from '../backend';
import ResultRow from '../components/results/ResultRow';

export default function ResultsPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/results' }) as { type?: 'thai' | 'bangkok' | 'all' };
  const { actor } = useActor();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!actor) return;

      try {
        let data: Result[] = [];
        if (search.type === 'thai') {
          data = await actor.getThaiHistory();
        } else if (search.type === 'bangkok') {
          data = await actor.getBangkokHistory();
        } else {
          data = await actor.getAllResults();
        }
        setResults(data);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [actor, search.type]);

  const getTitle = () => {
    if (search.type === 'thai') return 'THAI RESULTS HISTORY';
    if (search.type === 'bangkok') return 'BANGKOK RESULTS HISTORY';
    return 'RESULT HISTORY';
  };

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-slate-900 border-b border-gold flex items-center gap-4">
        <ArrowLeft className="w-6 h-6 text-gold cursor-pointer" onClick={() => navigate({ to: '/' })} />
        <h2 className="font-bold text-gold">{getTitle()}</h2>
      </header>

      <div className="p-4 space-y-3">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading results...</div>
        ) : results.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No results available</div>
        ) : (
          results.map((result, index) => <ResultRow key={index} result={result} />)
        )}
      </div>
    </div>
  );
}
