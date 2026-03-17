import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout"; // ✅ NEW

function App() {

  const [activePage, setActivePage] = useState("home");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          setSelectedProduct={setSelectedProduct}
          setActivePage={setActivePage}
        />
      )}

      {/* PRODUCTS */}
      {activePage === "products" && (
        <Products
          cart={cart}
          setCart={setCart}
          setSelectedProduct={setSelectedProduct}
          setActivePage={setActivePage}
        />
      )}

      {/* PRODUCT DETAILS */}
      {activePage === "details" && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          setCart={setCart}
        />
      )}

      {/* CHECKOUT PAGE ✅ */}
      {activePage === "checkout" && (
        <Checkout cart={cart} />
      )}

      {/* ABOUT */}
      {activePage === "about" && <About />}

      {/* CART */}
      {showCart && (
        <Cart
          cart={cart}
          setCart={setCart}
          setShowCart={setShowCart}
          setActivePage={setActivePage}   // ✅ IMPORTANT
        />
      )}
    </>
  );
}

export default App;