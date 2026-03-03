import { useState } from "react";

function Cart({ cart = [], setCart, setShowCart }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // ✅ Subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ✅ Delivery logic
  const deliveryCharge = subtotal >= 999 ? 0 : 50;

  // ✅ Final total
  const finalTotal = subtotal + deliveryCharge - discount;

  // ✅ Increase Quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // ✅ Decrease Quantity (0 hone par auto remove)
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  // ✅ Apply Coupon
  const applyCoupon = () => {
    if (coupon === "SAVE50") {
      setDiscount(50);
      alert("Coupon Applied! ₹50 Discount");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  // ✅ WhatsApp Order
  const confirmOrder = () => {
    if (!name || !address || !pin) {
      alert("Please fill all details");
      return;
    }

    let message = `🛍️ New Order\n\n`;
    message += `Name: ${name}\nAddress: ${address}\nPin: ${pin}\n\n`;
    message += `Items:\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `\nSubtotal: ₹${subtotal}`;
    message += `\nDelivery: ₹${deliveryCharge}`;
    message += `\nDiscount: ₹${discount}`;
    message += `\nTotal: ₹${finalTotal}`;

    const phoneNumber = "919922734633"; // 🔴 apna number dalna
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-full sm:w-96 h-full p-4 overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setShowCart(false)}>❌</button>
        </div>

        {cart.length === 0 && (
          <p className="text-center text-gray-500">Cart is empty</p>
        )}

        {/* Cart Items */}
        {cart.map((item) => (
          <div key={item.id} className="border-b py-3">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                −
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            <p className="mt-2 text-sm">
              Subtotal: ₹{item.price * item.quantity}
            </p>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            {/* Coupon */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
              <button
                onClick={applyCoupon}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Apply Coupon
              </button>
            </div>

            {/* Price Summary */}
            <div className="mt-4 text-sm space-y-1">
              <p>Subtotal: ₹{subtotal}</p>
              <p>Delivery: ₹{deliveryCharge}</p>
              <p>Discount: ₹{discount}</p>
              <p className="font-bold text-lg">Total: ₹{finalTotal}</p>
            </div>

            {!showCheckout && (
              <button
                onClick={() => setShowCheckout(true)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded"
              >
                Proceed to Confirm
              </button>
            )}
          </>
        )}

        {/* Checkout Form */}
        {showCheckout && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-bold mb-3">Customer Details</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Pin Code"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            <button
              onClick={confirmOrder}
              className="w-full bg-black text-white py-2 rounded"
            >
              Confirm Order on WhatsApp
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;