// src/Footer.jsx
import React from "react";

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="amazon-footer">
      <div className="back-to-top" onClick={handleScrollToTop}>
        Back to top
      </div>

      <div className="footer-columns">
        <div className="footer-col">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#">About Amazon</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="#">Sell on Amazon</a></li>
            <li><a href="#">Sell under Amazon Accelerator</a></li>
            <li><a href="#">Protect and Build Your Brand</a></li>
            <li><a href="#">Amazon Global Selling</a></li>
            <li><a href="#">Supply to Amazon</a></li>
            <li><a href="#">Become an Affiliate</a></li>
            <li><a href="#">Fulfilment by Amazon</a></li>
            <li><a href="#">Advertise Your Products</a></li>
            <li><a href="#">Amazon Pay on Merchants</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Returns Centre</a></li>
            <li><a href="#">Recalls and Product Safety Alerts</a></li>
            <li><a href="#">100% Purchase Protection</a></li>
            <li><a href="#">Amazon App Download</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-mid">
        <div className="footer-logo-row">
          <div className="footer-logo">
            Amazon<span>Clone</span>
          </div>
          <div className="footer-selectors">
            <div className="footer-selector">
              🌐 English
            </div>
            <div className="footer-selector">
              🇮🇳 India
            </div>
          </div>
        </div>
      </div>

      <div className="footer-sub">
        <div className="sub-grid">
          <div className="sub-item">
            <h4>AbeBooks</h4>
            <p>Books, art<br />& collectibles</p>
          </div>
          <div className="sub-item">
            <h4>Amazon Web Services</h4>
            <p>Scalable Cloud<br />Computing Services</p>
          </div>
          <div className="sub-item">
            <h4>Audible</h4>
            <p>Download<br />Audio Books</p>
          </div>
          <div className="sub-item">
            <h4>IMDb</h4>
            <p>Movies, TV<br />& Celebrities</p>
          </div>
          <div className="sub-item">
            <h4>Shopbop</h4>
            <p>Designer<br />Fashion Brands</p>
          </div>
          <div className="sub-item">
            <h4>Amazon Business</h4>
            <p>Everything For<br />Your Business</p>
          </div>
          <div className="sub-item">
            <h4>Amazon Music</h4>
            <p>Stream millions<br />of songs</p>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <div className="legal-links">
          <a href="#">Conditions of Use & Sale</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Interest-Based Ads</a>
        </div>
        <div className="legal-copyright">
          &copy; {new Date().getFullYear()} Amazon Clone. Developed for Ayush.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
