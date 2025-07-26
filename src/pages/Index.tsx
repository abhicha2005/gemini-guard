import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { PortfolioSummary } from '@/components/PortfolioSummary';
import { HoldingCard } from '@/components/HoldingCard';
import { AddHoldingDialog } from '@/components/AddHoldingDialog';
import { TopMoversSection } from '@/components/TopMoversSection';
import { CryptoHolding, Portfolio } from '@/types/crypto';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [holdings, setHoldings] = useState<CryptoHolding[]>([]);
  const { toast } = useToast();
  
  // Get unique crypto IDs for price fetching
  const cryptoIds = holdings.map(h => h.symbol.toLowerCase());
  const { prices, loading, refetch } = useCryptoPrices(cryptoIds);

  // Load holdings from localStorage on mount
  useEffect(() => {
    const savedHoldings = localStorage.getItem('cryptoHoldings');
    if (savedHoldings) {
      setHoldings(JSON.parse(savedHoldings));
    }
  }, []);

  // Save holdings to localStorage whenever holdings change
  useEffect(() => {
    localStorage.setItem('cryptoHoldings', JSON.stringify(holdings));
  }, [holdings]);

  // Update current prices when prices data changes
  useEffect(() => {
    if (prices.length > 0) {
      setHoldings(currentHoldings => 
        currentHoldings.map(holding => {
          const priceData = prices.find(p => p.symbol.toLowerCase() === holding.symbol.toLowerCase());
          if (priceData) {
            return {
              ...holding,
              currentPrice: priceData.current_price,
              image: priceData.image,
            };
          }
          return holding;
        })
      );
    }
  }, [prices]);

  const handleAddHolding = (newHolding: Omit<CryptoHolding, 'id'>) => {
    const holding: CryptoHolding = {
      ...newHolding,
      id: Date.now().toString(),
    };
    setHoldings(prev => [...prev, holding]);
  };

  const handleRemoveHolding = (id: string) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
    toast({
      title: "Removed",
      description: "Holding removed from portfolio",
    });
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshed",
      description: "Portfolio data updated",
    });
  };

  // Calculate portfolio summary
  const portfolio: Portfolio = {
    holdings,
    totalValue: holdings.reduce((sum, h) => sum + (h.amount * h.currentPrice), 0),
    totalInvested: holdings.reduce((sum, h) => sum + (h.amount * h.purchasePrice), 0),
    totalPnL: 0,
    totalPnLPercentage: 0,
  };

  portfolio.totalPnL = portfolio.totalValue - portfolio.totalInvested;
  portfolio.totalPnLPercentage = portfolio.totalInvested > 0 
    ? (portfolio.totalPnL / portfolio.totalInvested) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
          <div className="animate-slide-in-right">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-glow">
              Crypto Portfolio
            </h1>
            <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>Track your cryptocurrency investments</p>
          </div>
          <div className="flex gap-3 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="border-border hover:bg-muted/50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <AddHoldingDialog onAddHolding={handleAddHolding} />
          </div>
        </div>

        {/* Portfolio Summary */}
        {holdings.length > 0 && <PortfolioSummary portfolio={portfolio} />}

        {/* Holdings Grid */}
        {holdings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {holdings.map((holding, index) => (
              <div 
                key={holding.id}
                className="animate-scale-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <HoldingCard
                  holding={holding}
                  onRemove={handleRemoveHolding}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="max-w-md mx-auto animate-float">
              <h3 className="text-2xl font-semibold text-foreground mb-4 animate-scale-in">Start Building Your Portfolio</h3>
              <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Add your first cryptocurrency holding to start tracking your portfolio performance.
              </p>
              <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <AddHoldingDialog onAddHolding={handleAddHolding} />
              </div>
            </div>
          </div>
        )}

        {/* Top Movers Section */}
        <TopMoversSection />
      </div>
    </div>
  );
};

export default Index;