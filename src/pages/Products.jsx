import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products({ cart, setCart }) {

  // ✅ Add To Cart Function
  const addToCart = (product) => {

    // check if product already exists
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // increase quantity
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // add new product with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <p className="text-gray-500 mt-2">
          Explore our premium quality collection
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            addToCart={addToCart}   // ✅ PASS FUNCTION
          />
        ))}
      </div>

    </div>
  );
}

export default Products;