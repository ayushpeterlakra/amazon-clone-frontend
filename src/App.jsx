// src/App.jsx
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        // Already in cart — increase its quantity by 1
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item — add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function handleIncrease(productId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrease(productId) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // remove if it hits 0
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid #ddd"
      }}>
        <Link to="/" style={{ fontWeight: "bold", fontSize: "18px" }}>
          Amazon Clone
        </Link>
        <Link to="/cart">
          🛒 Cart ({totalItems})
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;