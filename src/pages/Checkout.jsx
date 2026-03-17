import { useState } from "react";

function Checkout({ cart }) {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {

    if (!form.name || !form.phone || !form.address) {
      alert("Fill all details");
      return;
    }

    alert("Order Placed Successfully 🎉 (COD)");

  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* FORM */}
      <div className="grid gap-4 mb-6">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <textarea
          name="address"
          placeholder="Full Address"
          onChange={handleChange}
          className="border p-3 rounded"
        />

      </div>

      {/* CART SUMMARY */}
      <div className="border p-4 rounded mb-6">

        <h3 className="font-bold mb-2">Order Summary</h3>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <p>{item.name} (x{item.quantity})</p>
            <p>₹{item.price}</p>
          </div>
        ))}

      </div>

      <button
        onClick={placeOrder}
        className="bg-black text-white w-full py-3 rounded"
      >
        Place Order (Cash on Delivery)
      </button>

    </div>
  );
}

export default Checkout;