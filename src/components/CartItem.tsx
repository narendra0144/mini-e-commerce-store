
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Trash, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/product/${product.id}`} className="hover:text-primary">
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => updateQuantity(product.id, quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="text-right font-medium w-24">
        ${(product.price * quantity).toFixed(2)}
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={() => removeFromCart(product.id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
