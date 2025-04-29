
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { getItemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">ShopLocal</Link>
          
          <Link to="/cart" className="md:hidden relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {getItemCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 min-w-[1.2rem] h-5 flex items-center justify-center">
                  {getItemCount()}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-auto md:mx-0">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="outline" size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {getItemCount() > 0 && (
                <Badge className="ml-1">{getItemCount()}</Badge>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
