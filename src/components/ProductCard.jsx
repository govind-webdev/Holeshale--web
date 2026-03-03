function ProductCard({ product, addToCart }) {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p>₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}   // ✅ PERFECT
        className="mt-3 bg-black text-white w-full py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;