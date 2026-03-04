import ProductCard from "../components/ProductCard";
import TrustSection from "../components/TrustSection";
import products from "../data/products";

function Home({ 
  cart = [], 
  setCart, 
  setSelectedProduct,   // ✅ NEW
  setActivePage         // ✅ NEW
}) {

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <>
      {/* Heading */}
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <p className="text-gray-500 mt-2">
          Premium Long Kurti Sets Available at Best Wholesale Price
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            setSelectedProduct={setSelectedProduct}   // ✅ PASS
            setActivePage={setActivePage}             // ✅ PASS
          />
        ))}
      </div>

      <TrustSection />
    </>
  );
}

export default Home;