import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Search } from 'lucide-react';
import { CryptoPrice, CryptoHolding } from '@/types/crypto';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { useToast } from '@/hooks/use-toast';

interface AddHoldingDialogProps {
  onAddHolding: (holding: Omit<CryptoHolding, 'id'>) => void;
}

export const AddHoldingDialog = ({ onAddHolding }: AddHoldingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CryptoPrice[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoPrice | null>(null);
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { searchCrypto } = useCryptoPrices();
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchCrypto(query);
      setSearchResults(results.slice(0, 10)); // Limit to 10 results
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCrypto = (crypto: CryptoPrice) => {
    setSelectedCrypto(crypto);
    setPurchasePrice(crypto.current_price.toString());
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCrypto || !amount || !purchasePrice) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const numAmount = parseFloat(amount);
    const numPurchasePrice = parseFloat(purchasePrice);

    if (isNaN(numAmount) || isNaN(numPurchasePrice) || numAmount <= 0 || numPurchasePrice <= 0) {
      toast({
        title: "Error",
        description: "Please enter valid positive numbers",
        variant: "destructive",
      });
      return;
    }

    onAddHolding({
      symbol: selectedCrypto.symbol,
      name: selectedCrypto.name,
      amount: numAmount,
      purchasePrice: numPurchasePrice,
      currentPrice: selectedCrypto.current_price,
      image: selectedCrypto.image,
    });

    // Reset form
    setSelectedCrypto(null);
    setAmount('');
    setPurchasePrice('');
    setSearchQuery('');
    setOpen(false);

    toast({
      title: "Success",
      description: `Added ${selectedCrypto.name} to your portfolio`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Holding
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Holding</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!selectedCrypto ? (
            <div className="space-y-2">
              <Label htmlFor="search" className="text-foreground">Search Cryptocurrency</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search Bitcoin, Ethereum..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>
              
              {isSearching && (
                <p className="text-sm text-muted-foreground">Searching...</p>
              )}
              
              {searchResults.length > 0 && (
                <div className="max-h-40 overflow-y-auto border border-border rounded-md bg-background">
                  {searchResults.map((crypto) => (
                    <button
                      key={crypto.id}
                      type="button"
                      onClick={() => handleSelectCrypto(crypto)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
                    >
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-medium text-foreground">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground uppercase">{crypto.symbol}</div>
                      </div>
                      <div className="ml-auto text-sm text-foreground">
                        ${crypto.current_price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-md">
                <img src={selectedCrypto.image} alt={selectedCrypto.name} className="w-8 h-8" />
                <div>
                  <div className="font-medium text-foreground">{selectedCrypto.name}</div>
                  <div className="text-sm text-muted-foreground uppercase">{selectedCrypto.symbol}</div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCrypto(null)}
                  className="ml-auto text-muted-foreground"
                >
                  Change
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchasePrice" className="text-foreground">Purchase Price (USD)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Add to Portfolio
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};