import { useState } from "react";

function ProductDetails({ product, setCart }) {

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // ⭐ Review
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  let touchStartX = 0;
  let touchEndX = 0;

  if (!product) {
    return <h2 className="text-center mt-10">Product Not Found</h2>;
  }

  // ✅ SWIPE
  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 50) {
      setCurrentImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }

    if (touchEndX - touchStartX > 50) {
      setCurrentImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  // ✅ ADD TO CART
  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, size: selectedSize, quantity: 1 }];
      }
    });

    // ✅ SUCCESS POPUP
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // ✅ WHATSAPP
  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    const phoneNumber = "917761830990";

    const message = `Hello, I want to order:
Product: ${product.name}
Price: ₹${product.price}
Size: ${selectedSize}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // ✅ ZOOM
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)"
    });
  };

  const resetZoom = () => {
    setZoomStyle({ transform: "scale(1)" });
  };

  // ⭐ ADD REVIEW
  const addReview = () => {
    if (!rating || !comment) {
      alert("Please add rating & comment");
      return;
    }

    const newReview = { rating, comment };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <div>

        <div
          className="w-full h-[45vh] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={product.images[currentImage]}
            alt={product.name}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetZoom}
            className="w-full h-full object-contain transition duration-300"
            style={zoomStyle}
          />
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setCurrentImage(index)}
              className={`w-14 h-14 object-cover border rounded cursor-pointer
              ${currentImage === index ? "border-black" : "border-gray-300"}`}
            />
          ))}
        </div>

      </div>

      {/* DETAILS */}
      <div>

        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {product.name}
        </h2>

        <p className="text-xl text-gray-700 mb-3">
          ₹{product.price}
        </p>

        <p className="text-gray-600 mb-5">
          {product.description}
        </p>

        {/* SIZE */}
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Size:</h3>

          <button
            onClick={() => setShowSizeGuide(true)}
            className="text-sm text-blue-600 underline"
          >
            Size Guide
          </button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {["M","L","XL","XXL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded
              ${selectedSize === size ? "bg-black text-white" : ""}`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* DESKTOP BUTTON */}
        <div className="hidden md:flex gap-3">
          <button onClick={addToCart} className="bg-black text-white px-6 py-3 rounded">
            Add to Cart
          </button>

          <button onClick={handleWhatsAppOrder} className="bg-green-600 text-white px-6 py-3 rounded">
            WhatsApp Order
          </button>
        </div>

      </div>

      {/* ⭐ REVIEWS */}
      <div className="md:col-span-2 mt-10">

        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

        <div className="mb-4">
          <div className="flex gap-1 text-2xl mb-2">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write review..."
            className="w-full border p-2 rounded mb-2"
          />

          <button onClick={addReview} className="bg-black text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>

        <div className="space-y-3">
          {reviews.map((rev, i) => (
            <div key={i} className="border p-3 rounded">
              <div className="text-yellow-500">{"★".repeat(rev.rating)}</div>
              <p>{rev.comment}</p>
            </div>
          ))}
        </div>

      </div>

      {/* SIZE GUIDE */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[90%] md:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Size Guide</h2>
            <p>M - 38 Chest</p>
            <p>L - 40 Chest</p>
            <p>XL - 42 Chest</p>
            <p>XXL - 44 Chest</p>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-4 bg-black text-white px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          ✅ Added Successfully
        </div>
      )}

      {/* MOBILE STICKY */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-3 shadow-md md:hidden flex gap-2">
        
        <button onClick={addToCart} className="bg-black text-white w-1/2 py-3 rounded">
          Add To Cart
        </button>

        <button onClick={handleWhatsAppOrder} className="bg-green-600 text-white w-1/2 py-3 rounded">
          WhatsApp
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;