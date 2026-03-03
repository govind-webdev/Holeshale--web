function Hero() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Wholesale Clothing at Best Price
      </h1>

      <p className="mt-4 text-gray-600 max-w-xl">
        Direct factory supply • Bulk orders • Fast delivery across India
      </p>

      <a
        href="https://wa.me/919922734633"
        target="_blank"
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Order on WhatsApp
      </a>
    </section>
  )
}

export default Hero