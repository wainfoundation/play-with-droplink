
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pi, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PiPriceData {
  price: number;
  change24h: number;
  lastUpdated: string;
}

const PiPriceWidget = () => {
  const [priceData, setPriceData] = useState<PiPriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPiPrice = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, you would fetch from a Pi price API
        // For now, we'll simulate the price data
        const mockPriceData: PiPriceData = {
          price: 47.84, // Mock price in USD
          change24h: 2.34, // Mock 24h change percentage
          lastUpdated: new Date().toISOString()
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPriceData(mockPriceData);
      } catch (err) {
        setError("Failed to fetch Pi price");
        console.error("Error fetching Pi price:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPiPrice();
    
    // Update price every 5 minutes
    const interval = setInterval(fetchPiPrice, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div>
              <p className="text-sm text-muted-foreground">Loading Pi price...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !priceData) {
    return (
      <Card className="w-full max-w-sm border-destructive/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Pi className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm text-destructive">Price unavailable</p>
              <p className="text-xs text-muted-foreground">Try again later</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPositiveChange = priceData.change24h >= 0;

  return (
    <Card className="w-full max-w-sm border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <Pi className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pi Network</p>
              <p className="text-lg font-bold">${priceData.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              variant={isPositiveChange ? "default" : "destructive"} 
              className="flex items-center gap-1"
            >
              {isPositiveChange ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositiveChange ? "+" : ""}{priceData.change24h.toFixed(2)}%
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">24h change</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-primary/10">
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date(priceData.lastUpdated).toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PiPriceWidget;
