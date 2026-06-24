// src/pages/Cart.jsx
import { Link } from "react-router-dom";

function Cart({ cart, onIncrease, onDecrease }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add a few products and they'll show up here.</p>
          <Link to="/" className="btn-primary">Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <p className="page-eyebrow">Cart</p>
      <h1 className="page-title">Your items</h1>
      <p className="page-subtitle">Review your picks before checking out.</p>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="image-frame">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="unit-price">₹{item.price} each</p>
                <div className="qty-stepper">
                  <button onClick={() => onDecrease(item._id)} aria-label="Decrease quantity">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item._id)} aria-label="Increase quantity">+</button>
                </div>
              </div>

              <p className="cart-item-total">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="summary-panel">
          <h2>Order summary</h2>
          <div className="summary-line">
            <span>Items</span>
            <span>{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-total">
            <span>Total</span>
            <span className="amount">₹{total}</span>
          </div>
          <Link to="/checkout" className="btn-primary" style={{ display: "block", textAlign: "center" }}>
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;