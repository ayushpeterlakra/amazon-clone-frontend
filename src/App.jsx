import { useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Footer from "./Footer";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
        <Link to="/" className="navbar-logo" onClick={() => setSearchQuery("")}>
          Amazon<span>Clone</span>
        </Link>

        {user && (
          <div className="navbar-search">
            <div className="search-category">
              All <span>▼</span>
            </div>
            <input
              type="text"
              placeholder="Search Amazon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        )}

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
        <Route path="/" element={user ? <Home onAddToCart={handleAddToCart} searchQuery={searchQuery} /> : <Navigate to="/login" />} />
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
      <Footer />
    </div>
  );
}

export default App;