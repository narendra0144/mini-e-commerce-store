
import Header from "@/components/Header";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const Cart = () => {
  const { items, clearCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    toast.success("Order placed successfully! This is a demo, so no actual purchase was made.");
    clearCart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          {items.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove all items from your cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="mb-4 pb-2 border-b hidden md:flex text-sm font-medium text-gray-500">
                  <span className="w-[calc(20px+1rem+50%)]">Product</span>
                  <span className="flex-1">Quantity</span>
                  <span className="w-24 text-right">Subtotal</span>
                  <span className="w-8"></span>
                </div>
                
                <div>
                  {items.map((item) => (
                    <CartItem 
                      key={item.product.id} 
                      product={item.product} 
                      quantity={item.quantity} 
                    />
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Link to="/products" className="inline-flex items-center text-primary hover:underline">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-80">
              <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-3 font-bold text-lg flex justify-between">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  This is a demo store. No real purchases will be made.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} ShopLocal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
