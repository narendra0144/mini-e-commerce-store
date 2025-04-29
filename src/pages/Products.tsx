
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "";
  const initialSearch = queryParams.get("search") || "";

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sort, setSort] = useState("featured");

  // Derive all available categories from products
  const categories = ["", ...new Set(products.map((p) => p.category))];

  // Filter products based on current filters
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (category && product.category !== category) return false;
    
    // Search filter
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // In stock filter
    if (inStockOnly && !product.inStock) return false;
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        // Default sorting by featured status
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (searchQuery) params.set("search", searchQuery);
    
    const newSearch = params.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    
    window.history.replaceState(null, '', newUrl);
  }, [category, searchQuery, location.pathname]);

  // Handle search from URL params
  useEffect(() => {
    setSearchQuery(initialSearch);
    setCategory(initialCategory);
  }, [initialSearch, initialCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Products</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h2 className="text-lg font-medium mb-4">Filters</h2>
              
              {/* Category Filter */}
              <div className="mb-4">
                <Label htmlFor="category" className="mb-2 block">Category</Label>
                <Select 
                  value={category} 
                  onValueChange={setCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat || "all"} value={cat}>
                        {cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All Categories"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <Label className="mb-2 block">Price Range</Label>
                <div className="mt-4">
                  <Slider
                    defaultValue={[0, 1500]}
                    max={1500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* In Stock Filter */}
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox 
                  id="inStock" 
                  checked={inStockOnly} 
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setInStockOnly(checked);
                    }
                  }}
                />
                <Label htmlFor="inStock">In Stock Only</Label>
              </div>
              
              {/* Sort Options */}
              <div>
                <Label htmlFor="sort" className="mb-2 block">Sort By</Label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger id="sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Reset Filters */}
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => {
                  setCategory("");
                  setInStockOnly(false);
                  setPriceRange([0, 1500]);
                  setSort("featured");
                  if (initialSearch) {
                    setSearchQuery(initialSearch);
                  } else {
                    setSearchQuery("");
                  }
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
            {searchQuery && (
              <p className="mb-4">
                Search results for: <span className="font-medium">{searchQuery}</span>
              </p>
            )}
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button 
                  onClick={() => {
                    setCategory("");
                    setSearchQuery("");
                    setInStockOnly(false);
                    setPriceRange([0, 1500]);
                    setSort("featured");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
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

export default Products;
