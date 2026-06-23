// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    setOrderPlaced(true);
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>✅ Order Placed!</h1>
        <p>Thank you, {address.fullName}. Your order will be delivered to:</p>
        <p>
          {address.street}, {address.city} - {address.pincode}
        </p>
        <p>Total paid: ₹{total}</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
      <div style={{ maxWidth: "400px" }}>
        <h1 style={{ whiteSpace: "nowrap" }}>Shipping Address</h1>
        <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
            required
          />
          <button type="submit">Place Order</button>
        </form>
      </div>

      <div>
        <h1>Order Summary</h1>
        {cart.map((item) => (
          <div key={item._id} style={{ marginBottom: "8px" }}>
            <p>
              {item.name} × {item.quantity} = ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
        <h2>Total: ₹{total}</h2>
      </div>
    </div>
  );
}

export default Checkout;