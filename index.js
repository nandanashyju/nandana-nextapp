import { useState } from 'react';
import Head from 'next/head';

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return { props: { products } };
}

export default function ProductListing({ products }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = (category) => {
    setFilteredProducts(
      category === 'all' 
        ? products 
        : products.filter(p => p.category === category)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Fashion Store | Products</title>
        <meta name="description" content="Browse our collection" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">FASHIONSTORE</h1>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </button>
                <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sign Up
                </button>
              </>
            )}
            <button className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => handleFilter('all')}
              className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md"
            >
              All Products
            </button>
            <button 
              onClick={() => handleFilter("men's clothing")}
              className="px-4 py-2 text-sm font-medium bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Men's
            </button>
            <button 
              onClick={() => handleFilter("women's clothing")}
              className="px-4 py-2 text-sm font-medium bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Women's
            </button>
          </div>
          
          <div className="w-full sm:w-auto">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 h-64 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  ${product.price}
                </p>
                <button className="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Fashion Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
