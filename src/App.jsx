import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]); // ✅ MUST be array

  return (
    <>
      <Navbar
        cart={cart}
        setShowCart={setShowCart}
        setActivePage={setActivePage}
      />

      {/* ✅ FIX 1: cart & setCart pass to Home */}
      {activePage === "home" && (
        <Home 
          cart={cart}
          setCart={setCart}
        />
      )}

      {/* ✅ FIX 2: cart & setCart pass to Products */}
      {activePage === "products" && (
        <Products 
          cart={cart}
          setCart={setCart}
        />
      )}

      {activePage === "about" && <About />}

      {/* ✅ FIX 3: setCart also pass to Cart */}
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