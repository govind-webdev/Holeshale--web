import { useState, useEffect } from "react";

function ProductDetails({ product, setCart }) {

  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return <h2 className="text-center mt-10">Product Not Found</h2>;
  }

  // ✅ Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [product]);

  const addToCart = () => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      
      {/* IMAGE SECTION */}
      <div className="relative">
        <img
          src={product.images[currentImage]}
          alt={product.name}
          className="w-full h-[450px] object-contain border rounded transition-all duration-700"
        />
      </div>

      {/* DETAILS SECTION */}
      <div>
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

        <p className="text-xl text-gray-700 mb-4">
          ₹{product.price}
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        <button
          onClick={addToCart}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;