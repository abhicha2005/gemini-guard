import { useState, useEffect } from 'react';
import { CryptoPrice } from '@/types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const useTopMovers = () => {
  const [gainers, setGainers] = useState<CryptoPrice[]>([]);
  const [losers, setLosers] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopMovers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch top movers');
      }
      
      const data = await response.json();
      
      // Filter out coins with null price change percentage and sort
      const validCoins = data.filter((coin: CryptoPrice) => 
        coin.price_change_percentage_24h !== null && 
        coin.price_change_percentage_24h !== undefined
      );
      
      // Get top 10 gainers (highest positive percentage change)
      const topGainers = validCoins
        .filter((coin: CryptoPrice) => coin.price_change_percentage_24h > 0)
        .sort((a: CryptoPrice, b: CryptoPrice) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 10);
      
      // Get top 10 losers (lowest negative percentage change)
      const topLosers = validCoins
        .filter((coin: CryptoPrice) => coin.price_change_percentage_24h < 0)
        .sort((a: CryptoPrice, b: CryptoPrice) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 10);
      
      setGainers(topGainers);
      setLosers(topLosers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch top movers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopMovers();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchTopMovers, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    gainers,
    losers,
    loading,
    error,
    refetch: fetchTopMovers
  };
};