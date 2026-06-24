// src/App.jsx
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  const navigate = useNavigate();
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
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  function handleClearCart() {
    setCart([]);
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
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          Amazon<span>Clone</span>
        </Link>

        <div className="navbar-links">
          {user ? (
            <>
              <span className="navbar-greeting">Hi, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </>
          )}
          <Link to="/cart" className="navbar-cart">
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={user ? <Home onAddToCart={handleAddToCart} /> : <Navigate to="/login" />} />
        <Route
          path="/cart"
          element={
            user ? (
              <Cart
                cart={cart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout cart={cart} onClearCart={handleClearCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;