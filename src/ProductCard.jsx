// src/ProductCard.jsx

function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      width: "220px",
      textAlign: "center"
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />
      <h3 style={{ fontSize: "16px" }}>{product.name}</h3>
      <p style={{ fontWeight: "bold" }}>₹{product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;