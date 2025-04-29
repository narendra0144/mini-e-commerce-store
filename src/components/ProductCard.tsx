
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="product-card overflow-hidden h-full flex flex-col animate-scale-in">
      <Link to={`/product/${product.id}`} className="overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          </Link>
          {!product.inStock && (
            <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200">
              Out of Stock
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Badge variant="secondary" className="capitalize">{product.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full gap-2" 
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
