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
    <div>
      <section className="hero-section">
        <p className="hero-eyebrow">Featured Collection</p>
        <h1 className="hero-title">
          Shop the <em>latest</em> tech innovations
        </h1>
        <p className="hero-subtitle">
          NovaBuy curates flagship phones and studio audio. Experience
          the pinnacle of performance with lightning-fast shipping.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary">Explore Deals</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </section>

      <div className="page">
        <div className="section-header">
          <h2>Trending Products</h2>
          <a href="#">View all categories →</a>
        </div>
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
    </div>
  );
}

export default Home;