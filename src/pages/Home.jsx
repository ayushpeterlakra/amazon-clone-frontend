// src/pages/Home.jsx
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";

function Home({ onAddToCart, searchQuery = "" }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page">
      <p className="page-eyebrow">Featured</p>
      <h1 className="page-title">Shop the latest tech</h1>
      <p className="page-subtitle">
        {searchQuery ? `Search results for "${searchQuery}"` : "Curated picks across phones and audio, shipped fast."}
      </p>
      
      {filteredProducts.length === 0 ? (
        <div className="empty-state" style={{ padding: "60px 20px" }}>
          <div className="empty-icon">🔍</div>
          <h2>No products found</h2>
          <p>We couldn't find any products matching "{searchQuery}". Try a different keyword!</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;