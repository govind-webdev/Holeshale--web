import { useParams } from "react-router-dom"
import products from "../data/products"

function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  if (!product) return <p>Product not found</p>

  const message = `Hello, I want to order:
${product.name}
Price: ₹${product.price}`

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={product.image} className="w-full h-80 object-cover rounded-lg" />

      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-xl text-gray-600 mt-2">₹{product.price}</p>

      <a
        href={`https://wa.me/919922734633?text=${encodeURIComponent(message)}`}
        target="_blank"
        className="inline-block mt-6 bg-green-500 text-white px-6 py-3 rounded-lg"
      >
        Order on WhatsApp
      </a>
    </div>
  )
}

export default ProductDetail