import { useState, useEffect } from "react";

function Navbar({ cart = [], setShowCart, setActivePage, activePage }) {

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Scroll logic (hide/show)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // background change
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // hide / show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNav(false); // scroll down → hide
      } else {
        setShowNav(true); // scroll up → show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Active link
  const getLinkClass = (page) =>
    `cursor-pointer transition ${
      activePage === page
        ? "text-black font-bold border-b-2 border-black"
        : "text-gray-600"
    }`;

  return (
    <nav
      style={{ transform: "translateZ(0)" }}
      className={`fixed top-0 left-0 w-full z-50 flex items-center p-4
      transition-transform duration-300 will-change-transform
      ${showNav ? "translate-y-0" : "-translate-y-full"}
      ${isScrolled ? "bg-white shadow-sm" : "bg-white"}`}
    >

      {/* LEFT */}
      <div className="flex-1">
        <h1
          onClick={() => setActivePage("home")}
          className="font-bold text-xl cursor-pointer"
        >
          Vaibhav Selection <br /> Tulsibag (Pune)
        </h1>
      </div>

      {/* CENTER */}
      <div className="flex-1 flex justify-center gap-6">
        <button
          onClick={() => setActivePage("products")}
          className={getLinkClass("products")}
        >
          Our Products
        </button>

        <button
          onClick={() => setActivePage("about")}
          className={getLinkClass("about")}
        >
          About My Shop
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex justify-end">
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-black text-white px-4 py-2 rounded"
        >
          Cart
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
            {cart.length}
          </span>
        </button>
      </div>

    </nav>
  );
}

export default Navbar;