
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, Share2, ShoppingCart } from "lucide-react";
import { DigitalProduct } from "@/hooks/useDigitalProducts";
import { usePiPayment } from "@/hooks/usePiPayment";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: DigitalProduct;
  onPurchase?: (product: DigitalProduct) => void;
  showActions?: boolean;
  compact?: boolean;
}

const ProductCard = ({ product, onPurchase, showActions = true, compact = false }: ProductCardProps) => {
  const [loading, setLoading] = useState(false);
  const { handleSubscribe } = usePiPayment();
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!onPurchase) return;
    
    setLoading(true);
    try {
      // This will trigger the Pi payment flow
      onPurchase(product);
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard",
      });
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${compact ? 'h-auto' : 'h-full'}`}>
      {product.image_url && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url}
            alt={product.title}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              compact ? 'h-32' : 'h-48'
            }`}
          />
          {product.category && (
            <Badge className="absolute top-2 left-2 bg-primary text-white">
              {product.category}
            </Badge>
          )}
        </div>
      )}

      <CardHeader className={compact ? 'p-3' : 'p-4'}>
        <div className="flex items-start justify-between">
          <h3 className={`font-semibold text-foreground line-clamp-2 ${compact ? 'text-sm' : 'text-lg'}`}>
            {product.title}
          </h3>
          <div className="flex items-center gap-1 text-primary font-bold">
            <span className={compact ? 'text-sm' : 'text-lg'}>{product.price}</span>
            <span className={`text-xs ${compact ? 'text-xs' : 'text-sm'}`}>π</span>
          </div>
        </div>
      </CardHeader>

      {product.description && !compact && (
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {product.description}
          </p>
        </CardContent>
      )}

      {product.tags && product.tags.length > 0 && !compact && (
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {product.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      )}

      {showActions && (
        <CardFooter className={`flex gap-2 ${compact ? 'p-3' : 'p-4'}`}>
          <Button
            onClick={handlePurchase}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90"
            size={compact ? "sm" : "default"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {loading ? "Processing..." : `Buy ${product.price}π`}
          </Button>
          
          <Button
            variant="outline"
            size={compact ? "sm" : "default"}
            onClick={handleShare}
            className="p-2"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}

      {product.download_count > 0 && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Download className="h-3 w-3" />
            <span>{product.download_count} downloads</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
