// src/ProductCard.jsx

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="image-frame">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p className="price">
        <span className="symbol">₹</span>{product.price}
      </p>
      <button className="btn-primary" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;