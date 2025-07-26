import { TrendingUp, TrendingDown } from 'lucide-react';
import { TopMoversCard } from '@/components/TopMoversCard';
import { useTopMovers } from '@/hooks/useTopMovers';

export const TopMoversSection = () => {
  const { gainers, losers, loading, refetch } = useTopMovers();

  return (
    <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Market Movers</h2>
        <p className="text-muted-foreground">Top performing cryptocurrencies in the last 24 hours</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopMoversCard
          title="Top Gainers"
          icon={<TrendingUp className="h-5 w-5 text-success animate-float" />}
          cryptos={gainers}
          isGainer={true}
          loading={loading}
          onRefresh={refetch}
        />
        
        <TopMoversCard
          title="Top Losers"
          icon={<TrendingDown className="h-5 w-5 text-danger animate-float" style={{ animationDelay: '0.5s' }} />}
          cryptos={losers}
          isGainer={false}
          loading={loading}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
};