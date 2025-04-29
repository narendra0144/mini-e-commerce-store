
import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Shop the Latest <span className="text-primary">Tech Deals</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-md">
                  Discover amazing products at unbeatable prices. From electronics to home essentials, we've got you covered.
                </p>
                <div className="flex gap-4">
                  <Button asChild size="lg">
                    <Link to="/products">Shop Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/products">Browse Categories</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070" 
                  alt="ShopLocal Hero" 
                  className="rounded-lg shadow-lg max-h-[400px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <FeaturedProducts />
        
        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">Shop by Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Electronics Category */}
              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <img 
                  src="https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=724" 
                  alt="Electronics" 
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Electronics</h3>
                  <p className="text-white/80 mb-4">Latest gadgets and devices</p>
                  <Button asChild variant="secondary" className="w-fit">
                    <Link to="/products?category=electronics">
                      Explore <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Furniture Category */}
              <div className="relative overflow-hidden rounded-lg shadow-md group">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=716" 
                  alt="Furniture" 
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Furniture</h3>
                  <p className="text-white/80 mb-4">Stylish and comfortable</p>
                  <Button asChild variant="secondary" className="w-fit">
                    <Link to="/products?category=furniture">
                      Explore <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* All Products */}
              <div className="relative overflow-hidden rounded-lg shadow-md group bg-gradient-to-br from-primary/90 to-purple-700">
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,#ffffff33,transparent)]"></div>
                </div>
                <div className="relative h-60 flex flex-col justify-center items-center p-6 text-center">
                  <h3 className="text-white text-xl font-bold mb-2">All Categories</h3>
                  <p className="text-white/80 mb-6">Discover our full collection</p>
                  <Button asChild variant="secondary" size="lg">
                    <Link to="/products">
                      Shop All Products
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Browse our collection of premium products and find exactly what you need at prices you'll love.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </section>
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

export default Index;
