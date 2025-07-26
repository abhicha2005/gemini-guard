export interface CryptoHolding {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
  image?: string;
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap_rank: number;
}

export interface Portfolio {
  holdings: CryptoHolding[];
  totalValue: number;
  totalInvested: number;
  totalPnL: number;
  totalPnLPercentage: number;
}