import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AddToCart.css";

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithQuantities = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(cartWithQuantities);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateLocalStorage(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateLocalStorage(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    updateLocalStorage(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <br></br>
          <Link to="/" className="continue-shopping-btn">
            Continue Proceed
          </Link>
        </div>
      ) : (
        <div className="cart-wrapper">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="cart-item-img"
                />
              </div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">Price: ₹{item.price}</p>
                <div className="qty-controls">
                  <button onClick={() => decreaseQuantity(index)} className="qty-btn">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(index)} className="qty-btn">+</button>
                </div>
                <button onClick={() => removeItem(index)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="total-amount">
            Total Amount: ₹{getTotalPrice()}
          </div>

          <div className="text-center">
            <Link to="/add-passenger" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
