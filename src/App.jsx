// src/App.jsx
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  function handleLogin(newToken, newUser) {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  function handleAddToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
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
        .filter((item) => item.quantity > 0)
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: "1px solid #ddd"
      }}>
        <Link to="/" style={{ fontWeight: "bold", fontSize: "18px" }}>
          Amazon Clone
        </Link>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </>
          )}
          <Link to="/cart">🛒 Cart ({totalItems})</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
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
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;