import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoHolding } from '@/types/crypto';

interface HoldingCardProps {
  holding: CryptoHolding;
  onRemove: (id: string) => void;
}

export const HoldingCard = ({ holding, onRemove }: HoldingCardProps) => {
  const currentValue = holding.amount * holding.currentPrice;
  const investedValue = holding.amount * holding.purchasePrice;
  const pnl = currentValue - investedValue;
  const pnlPercentage = ((currentValue - investedValue) / investedValue) * 100;
  const isPositive = pnl >= 0;

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {holding.image && (
              <img 
                src={holding.image} 
                alt={holding.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <h3 className="font-semibold text-foreground">{holding.name}</h3>
              <p className="text-sm text-muted-foreground uppercase">{holding.symbol}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(holding.id)}
            className="text-muted-foreground hover:text-danger"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="font-medium text-foreground">{holding.amount.toFixed(8)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Price</span>
            <span className="font-medium text-foreground">
              ${holding.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Value</span>
            <span className="font-semibold text-foreground">
              ${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                P&L
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-danger" />
                )}
              </span>
              <div className="text-right">
                <div className={`font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {isPositive ? '+' : ''}${pnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`text-sm ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {isPositive ? '+' : ''}{pnlPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};