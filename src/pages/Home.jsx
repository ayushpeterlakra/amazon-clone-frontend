// src/pages/Home.jsx
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  return (
    <div className="page">
      <p className="page-eyebrow">Featured</p>
      <h1 className="page-title">Shop the latest tech</h1>
      <p className="page-subtitle">
        Curated picks across phones and audio, shipped fast.
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;