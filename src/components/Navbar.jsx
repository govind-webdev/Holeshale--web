function Navbar({ cart = [], setShowCart, setActivePage }) {
  return (
    <nav className="flex items-center p-4 shadow bg-white">

      <div className="flex-1">
        <h1
          onClick={() => setActivePage("home")}
          className="font-bold text-xl cursor-pointer"
        >
          Vaibhav Selection <br /> Tulsibag (Pune)
        </h1>
      </div>

      <div className="flex-1 flex justify-center gap-6">
        <button onClick={() => setActivePage("products")}>
          Our Products
        </button>

        <button onClick={() => setActivePage("about")}>
          About My Shop
        </button>
      </div>

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