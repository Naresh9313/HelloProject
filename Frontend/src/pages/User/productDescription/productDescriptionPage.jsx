import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../User/productDescription/ProductDescription.css";

export default function ProductDescription() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/category/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  const handleBookNow = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyInCart = existingCart.find(item => item._id === product._id);

    let updatedCart;

    if (alreadyInCart) {
      updatedCart = existingCart.map(item =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate("/addToCart");
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-container">
      <div className="product-wrapper">
        <div className="product-image">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            height={700}
            width={1000}
          />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="price">₹{product.price}</p>
          <button className="buy-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
