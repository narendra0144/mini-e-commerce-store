
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 249.99,
    description: "Track your fitness goals, receive notifications, and more with this water-resistant smart watch. Compatible with iOS and Android.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Ultra-Slim Laptop",
    price: 899.99,
    description: "Powerful performance in an ultra-slim design. Features a 14-inch 4K display, 16GB RAM, and 512GB SSD storage.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Professional Camera Kit",
    price: 1299.99,
    description: "Capture stunning photos and videos with this professional-grade camera kit. Includes multiple lenses and accessories.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    description: "Precision gaming with zero lag. Features customizable RGB lighting and programmable buttons.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: false,
    inStock: true,
  },
  {
    id: 6,
    name: "Bluetooth Portable Speaker",
    price: 129.99,
    description: "Take your music anywhere with this waterproof portable speaker. Offers 24 hours of playtime and deep bass.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: false,
    inStock: true,
  },
  {
    id: 7,
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "Work in comfort with this adjustable ergonomic office chair. Features lumbar support and breathable mesh design.",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "furniture",
    featured: true,
    inStock: true,
  },
  {
    id: 8,
    name: "Smart Home Security System",
    price: 399.99,
    description: "Monitor your home from anywhere with this complete smart security system. Includes cameras, sensors, and smartphone integration.",
    image: "https://images.unsplash.com/photo-1558002038-1055e2dae2d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: false,
    inStock: false,
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
