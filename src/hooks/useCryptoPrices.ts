import { useState, useEffect } from 'react';
import { CryptoPrice } from '@/types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const useCryptoPrices = (symbols: string[] = []) => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async (cryptoIds: string[]) => {
    if (cryptoIds.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto prices');
      }
      
      const data = await response.json();
      setPrices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  };

  const searchCrypto = async (query: string): Promise<CryptoPrice[]> => {
    if (!query.trim()) return [];
    
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search cryptocurrencies');
      }
      
      const data = await response.json();
      return data.filter((coin: CryptoPrice) => 
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    } catch (err) {
      console.error('Error searching crypto:', err);
      return [];
    }
  };

  useEffect(() => {
    if (symbols.length > 0) {
      fetchPrices(symbols);
    }
  }, [symbols.join(',')]);

  return {
    prices,
    loading,
    error,
    refetch: () => fetchPrices(symbols),
    searchCrypto
  };
};