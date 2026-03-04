import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ NEW

  return (
    <>
      <Navbar
        cart={cart}
        setShowCart={setShowCart}
        setActivePage={setActivePage}
      />

      {/* HOME */}
      {activePage === "home" && (
        <Home
          cart={cart}
          setCart={setCart}
          setSelectedProduct={setSelectedProduct}   // ✅ NEW
          setActivePage={setActivePage}             // ✅ NEW
        />
      )}

      {/* PRODUCTS */}
      {activePage === "products" && (
        <Products
          cart={cart}
          setCart={setCart}
          setSelectedProduct={setSelectedProduct}   // ✅ NEW
          setActivePage={setActivePage}             // ✅ NEW
        />
      )}

      {/* PRODUCT DETAILS */}
      {activePage === "details" && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          setCart={setCart}
        />
      )}

      {/* ABOUT */}
      {activePage === "about" && <About />}

      {/* CART */}
      {showCart && (
        <Cart
          cart={cart}
          setCart={setCart}
          setShowCart={setShowCart}
        />
      )}
    </>
  );
}

export default App;