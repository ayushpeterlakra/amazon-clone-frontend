// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, onClearCart }) {
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    setOrderTotal(total);
    setOrderPlaced(true);
    if (onClearCart) onClearCart();
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>Nothing to check out yet</h2>
          <p>Add items to your cart first.</p>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="confirmation-shell">
        <div className="confirmation-card">
          <div className="confirmation-check">✓</div>
          <h1>Order placed</h1>
          <p>Thanks, {address.fullName}. We're getting your order ready.</p>

          <div className="confirmation-address">
            {address.street}<br />
            {address.city} — {address.pincode}<br />
            {address.phone}
          </div>

          <p className="confirmation-total">₹{orderTotal} paid</p>

          <button onClick={() => navigate("/")} className="btn-primary" style={{ width: "auto", padding: "11px 28px" }}>
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <p className="page-eyebrow">Checkout</p>
      <h1 className="page-title">Almost there</h1>
      <p className="page-subtitle">Confirm your delivery details to place the order.</p>

      <div className="checkout-layout">
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <h2>Shipping address</h2>

          <div className="field-group">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Jordan Lee"
              value={address.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="street">Street address</label>
            <input
              id="street"
              type="text"
              name="street"
              placeholder="123 Main Street"
              value={address.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-row">
            <div className="field-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Ranchi"
                value={address.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="834001"
                value={address.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="98765 43210"
              value={address.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Place order</button>
        </form>

        <div className="summary-panel">
          <h2>Order summary</h2>

          <div className="summary-items">
            {cart.map((item) => (
              <div key={item._id} className="summary-item-row">
                <span className="item-name">{item.name} × {item.quantity}</span>
                <span className="item-amount">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="summary-divider" />
          <div className="summary-total">
            <span>Total</span>
            <span className="amount">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;