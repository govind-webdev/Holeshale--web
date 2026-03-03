import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">About My Shop</h1>
        <p className="text-gray-500 mt-2">
          Know more about our journey & mission
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">

        <p>
          Welcome to <span className="font-semibold">Vaibhav Selection</span>. 
          We provide high-quality clothing products at affordable prices.
        </p>

        <p>
          Our mission is to deliver premium fashion with trust and transparency.
          We believe in customer satisfaction and long-term relationships.
        </p>

        <p>
          Location: Tulsibag, Pune  
          <br />
          Contact: +91 9922734633
        </p>

      </div>

    </div>
  );
}

export default About;