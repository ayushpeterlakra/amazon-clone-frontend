// src/App.jsx
import { useState } from "react";
import { products } from "./products";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Amazon Clone</h1>
      <p>🛒 Cart items: {cart.length}</p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;