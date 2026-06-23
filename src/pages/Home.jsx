// src/pages/Home.jsx
import { products } from "../products";
import ProductCard from "../ProductCard";

function Home({ cart, onAddToCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Amazon Clone</h1>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;