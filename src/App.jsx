// src/App.jsx
import { useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
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
    navigate("/login");
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

  function handleOrderComplete() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-row-top">
          <Link to="/" className="navbar-logo">
            Nova<span>Buy</span>
          </Link>

          {isHome && (
            <div className="navbar-search">
              <select defaultValue="all">
                <option value="all">All</option>
                <option value="mobiles">Mobiles</option>
                <option value="electronics">Electronics</option>
              </select>
              <input type="text" placeholder="Search NovaBuy..." />
              <button aria-label="Search">🔍</button>
            </div>
          )}

          {isHome && (
            <div className="navbar-categories">
              <a href="#">Deals</a>
              <a href="#">Mobiles</a>
              <a href="#">Electronics</a>
              <a href="#">Service</a>
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
                {location.pathname !== "/signup" && <Link to="/signup">Sign Up</Link>}
                {location.pathname !== "/login" && <Link to="/login">Login</Link>}
              </>
            )}
            {isHome && (
              <Link to="/cart" className="navbar-cart">
                🛒 Cart ({totalItems})
              </Link>
            )}
          </div>
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
        <Route path="/checkout" element={<Checkout cart={cart} onOrderComplete={handleOrderComplete} />} />
      </Routes>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Get to Know Us</h4>
            <a href="#">About NovaBuy</a>
            <a href="#">Careers</a>
            <a href="#">Press Releases</a>
            <a href="#">NovaBuy Labs</a>
          </div>
          <div className="footer-col">
            <h4>Connect with Us</h4>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <div className="footer-col">
            <h4>Make Money with Us</h4>
            <a href="#">Sell on NovaBuy</a>
            <a href="#">Protect Your Brand</a>
            <a href="#">Become an Affiliate</a>
            <a href="#">Advertise Your Products</a>
          </div>
          <div className="footer-col">
            <h4>Let Us Help You</h4>
            <a href="#">Your Account</a>
            <a href="#">Returns Centre</a>
            <a href="#">Help</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>NovaBuy</span>
          <span>© 2026 NovaBuy. All rights reserved. Built for professional retail experiences.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;