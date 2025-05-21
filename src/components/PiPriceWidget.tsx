
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pi } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PiPrice {
  usd: number;
  btc: number;
  eur: number;
  change24h: number;
}

const PiPriceWidget = () => {
  const [price, setPrice] = useState<PiPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPiPrice = async () => {
      try {
        setLoading(true);
        // Fetch Pi price from a public API
        // Note: This is a placeholder URL - replace with actual Pi price API
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd,eur,btc&include_24hr_change=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Pi price');
        }
        
        const data = await response.json();
        
        // Format the response
        const piData: PiPrice = {
          usd: data['pi-network']?.usd || 0,
          eur: data['pi-network']?.eur || 0,
          btc: data['pi-network']?.btc || 0,
          change24h: data['pi-network']?.usd_24h_change || 0
        };
        
        setPrice(piData);
      } catch (error) {
        console.error("Error fetching Pi price:", error);
        setError("Could not load Pi price information");
        // Use fallback data when API fails
        setPrice({
          usd: 0.0145,
          eur: 0.0135,
          btc: 0.00000041,
          change24h: 2.5
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPiPrice();
    
    // Refresh price every 5 minutes
    const interval = setInterval(fetchPiPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Pi className="h-5 w-5 mr-2 text-primary" />
            <span className="font-medium">Pi Network</span>
          </div>
          
          {loading ? (
            <Skeleton className="h-6 w-20" />
          ) : error ? (
            <span className="text-sm text-destructive">Price unavailable</span>
          ) : (
            <div className="text-right">
              <div className="text-lg font-bold">${price?.usd.toFixed(6)}</div>
              <div className={`text-xs ${price && price.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {price && price.change24h >= 0 ? '▲' : '▼'} 
                {price?.change24h.toFixed(2)}%
              </div>
            </div>
          )}
        </div>
        
        {!loading && !error && price && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>BTC: {price.btc.toFixed(8)}</div>
            <div>EUR: €{price.eur.toFixed(6)}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PiPriceWidget;
