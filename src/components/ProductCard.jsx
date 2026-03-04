function ProductCard({ 
  product, 
  addToCart, 
  setSelectedProduct, 
  setActivePage 
}) {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-white overflow-hidden">
      
      {/* Image Section */}
      <div 
        className="bg-gray-100 flex items-center justify-center h-56 p-4 cursor-pointer"
        onClick={() => {
          setSelectedProduct(product);
          setActivePage("details");
        }}
      >
        <img
          src={product.images[0]}   // ✅ FIXED (array ka first image)
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 
          className="font-semibold text-lg cursor-pointer"
          onClick={() => {
            setSelectedProduct(product);
            setActivePage("details");
          }}
        >
          {product.name}
        </h3>

        <p className="text-gray-700 mt-1 font-medium">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;