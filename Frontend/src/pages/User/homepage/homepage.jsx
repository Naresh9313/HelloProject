
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../homepage/homepage.css";
import videoBg from "../../../../src/assets/tripVideo.mp4";

export default function Homepage() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);

    fetchCategories();

    const handleScroll = () => {
      setIsHeaderFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category/getcategory");
      const data = res.data.data || res.data.categories || res.data || [];
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `<span>${product.name} added to cart!</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    }, 100);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage">
      <header className={`header ${isHeaderFixed ? 'fixed-header' : ''}`}>
        <div className="header-container">
          <div className="logo-container">
            <img src="TripLogo.jpg" alt="Trip Logo" className="logo-image" />
          </div>
          <nav className="nav-links">
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/addToCart" className="cart-link">
              <span className="cart-icon">🛒Cart</span>
              {cart.length > 0 && (
                <span className="cart-badge">
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </Link>
            {user ? (
              <div className="user-menu">
                <button className="user-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className="user-icon">👤</span>
                  <span className="user-name">{user.username}</span>
                </button>
                {dropdownOpen && (
                  <div className="dropdown">
                    <Link to="/profile" className="dropdown-item">👤 Profile</Link>
                    <Link to="/logout" className="dropdown-item">🚪 Logout</Link>
                    <Link to="/AdminLogin" className="dropdown-item">🔑 Admin Login</Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-link">🔐 Login</Link>
            )}
          </nav>
        </div>
      </header>

      <div className="main">
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="content">
          <h1>Welcome to Trip Booking</h1>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              placeholder="Search Trips..."
            />
            <button onClick={handleSearch} className="search-button">
              🔍
            </button>
          </div>
        </div>
      </div>

      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">📁 Trips</h2>
          <p className="section-subtitle">Explore Your Next Adventure</p>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="no-products">
            <p>No trips found matching your search.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredCategories.slice(0, 9).map((cat) => (
              <div key={cat._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5000/uploads/${cat.image}`}
                    alt={cat.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button
                      onClick={() => handleAddToCart(cat)}
                      className="quick-add-button"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                <Link to={`/product/${cat._id}`} className="product-details">
                  <h3 className="product-name">{cat.name}</h3>
                  <p className="product-description">{cat.description}</p>
                  <p className="product-price">₹{cat.price}</p>
                </Link>
                <button
                  onClick={() => handleAddToCart(cat)}
                  className="add-to-cart-button"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We help you explore the world one trip at a time.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/addToCart">Cart</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: imsc200038vishal@ljku.edu.in</p>
            <p>Phone: +91 8128847951</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#">📘</a>
              <a href="#">📸</a>
              <a href="#">🐦</a>
              <a href="#">📍</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vishal Parmar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}