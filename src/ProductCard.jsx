// src/ProductCard.jsx

// Front-end-only display data — your backend doesn't store badges/ratings,
// so this is a simple lookup by product name with a sensible fallback.
const PRODUCT_META = {
  "Samsung Galaxy S24": { badge: "New Arrival", badgeClass: "new", rating: 4.6, count: "4.8k" },
  "GTA 6": { badge: "Pre-order", badgeClass: "preorder", rating: 4.9, count: "12k" },
  "iPhone 15": { badge: "Bestseller", badgeClass: "bestseller", rating: 4.7, count: "8.3k" },
  "Sony Headphones": { badge: "Editor's Choice", badgeClass: "editors", rating: 4.5, count: "15k" },
};

const DEFAULT_META = { badge: "Featured", badgeClass: "new", rating: 4.5, count: "1.2k" };

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="stars">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

function ProductCard({ product, onAddToCart }) {
  const meta = PRODUCT_META[product.name] || DEFAULT_META;

  return (
    <div className="product-card">
      <div className="image-frame">
        <img src={product.image} alt={product.name} />
      </div>

      <p className={`product-badge ${meta.badgeClass}`}>{meta.badge}</p>
      <h3>{product.name}</h3>

      <div className="product-rating">
        <Stars rating={meta.rating} />
        <span className="count">({meta.count})</span>
      </div>

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