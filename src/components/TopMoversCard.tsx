import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CryptoPrice } from '@/types/crypto';

interface TopMoversCardProps {
  title: string;
  icon: React.ReactNode;
  cryptos: CryptoPrice[];
  isGainer: boolean;
  loading: boolean;
  onRefresh: () => void;
}

export const TopMoversCard = ({ title, icon, cryptos, isGainer, loading, onRefresh }: TopMoversCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="hover:bg-muted/50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-muted rounded-full"></div>
                  <div className="space-y-1">
                    <div className="w-16 h-3 bg-muted rounded"></div>
                    <div className="w-12 h-2 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="w-16 h-4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : cryptos.length > 0 ? (
          cryptos.slice(0, 5).map((crypto, index) => (
            <div 
              key={crypto.id} 
              className="flex justify-between items-center hover:bg-muted/20 p-2 rounded-lg transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={crypto.image} 
                  alt={crypto.name}
                  className="w-6 h-6 rounded-full animate-float" 
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
                <div>
                  <p className="font-medium text-foreground text-sm">{crypto.name}</p>
                  <p className="text-xs text-muted-foreground uppercase">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  ${crypto.current_price.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: crypto.current_price < 1 ? 6 : 2 
                  })}
                </p>
                <div className={`text-sm font-semibold ${isGainer ? 'text-success' : 'text-danger'} flex items-center gap-1`}>
                  {isGainer ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {isGainer ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No data available
          </div>
        )}
        
        {cryptos.length > 5 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              +{cryptos.length - 5} more {isGainer ? 'gainers' : 'losers'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};