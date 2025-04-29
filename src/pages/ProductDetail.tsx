
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-6 flex items-center justify-center bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[400px] object-contain"
              />
            </div>
            
            {/* Product Details */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">{product.category}</Badge>
                {product.featured && <Badge className="bg-amber-500">Featured</Badge>}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="my-6">
                <div className="flex items-center mb-6">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-r-none"
                      onClick={decrementQuantity}
                      disabled={!product.inStock}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-l-none"
                      onClick={incrementQuantity}
                      disabled={!product.inStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                {product.inStock ? (
                  <Button 
                    className="w-full gap-2 text-lg py-6" 
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                ) : (
                  <Button disabled className="w-full">Out of Stock</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-12">
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

export default ProductDetail;
