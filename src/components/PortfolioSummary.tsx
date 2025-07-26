import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { Portfolio } from '@/types/crypto';

interface PortfolioSummaryProps {
  portfolio: Portfolio;
}

export const PortfolioSummary = ({ portfolio }: PortfolioSummaryProps) => {
  const isPositive = portfolio.totalPnL >= 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-scale-in hover:animate-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-primary animate-float" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-scale-in hover:animate-glow" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground animate-float" style={{ animationDelay: '0.5s' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ${portfolio.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-scale-in hover:animate-glow" style={{ animationDelay: '0.2s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success animate-float" style={{ animationDelay: '1s' }} />
          ) : (
            <TrendingDown className="h-4 w-4 text-danger animate-float" style={{ animationDelay: '1s' }} />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}${portfolio.totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-scale-in hover:animate-glow" style={{ animationDelay: '0.3s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">P&L Percentage</CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success animate-float" style={{ animationDelay: '1.5s' }} />
          ) : (
            <TrendingDown className="h-4 w-4 text-danger animate-float" style={{ animationDelay: '1.5s' }} />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}{portfolio.totalPnLPercentage.toFixed(2)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};