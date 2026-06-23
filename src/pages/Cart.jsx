// src/pages/Cart.jsx
import { Link } from "react-router-dom";

function Cart({ cart, onIncrease, onDecrease }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {cart.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              maxWidth: "500px"
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 8px 0" }}>{item.name}</h3>
              <p style={{ margin: "0 0 8px 0" }}>₹{item.price} each</p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button onClick={() => onDecrease(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item._id)}>+</button>
              </div>
            </div>
            <p style={{ fontWeight: "bold" }}>
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: "20px" }}>Total: ₹{total}</h2>
      <Link to="/checkout">
        <button style={{ marginTop: "10px" }}>Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;