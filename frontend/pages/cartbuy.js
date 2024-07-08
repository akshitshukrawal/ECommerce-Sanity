import React, { useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { BsArrowLeft } from "react-icons/bs";
import { toast } from 'react-hot-toast';

const CartBuy = () => {
  const { totalPrice, totalQuantities, cartItems, handleCartBuy, setShowCart, SetEmailId } = useStateContext();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    SetEmailId(e.target.value); // Update emailId state in context
  };

  const handleProceedToPay = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    try {
      // Call handleCartBuy function which submits the order
      await handleCartBuy();

      // Optionally clear the email field after successful submission
      setEmail('');

    } catch (error) {
      console.error('Error proceeding to pay:', error);
      toast.error('Failed to proceed to pay. Please try again later.');
    }
  };

  return (
    <div className="cartbuy-wrapper">
      <div className="left-section">
        <div className="back-to-cart-wrapper">
          <button className='back-to-cart-link' onClick={() => setShowCart(true)}>
            <BsArrowLeft />
            Back to Cart
          </button>
        </div>
        <h2 className="section-title">Product Details</h2>
        <ul className="product-list">
          {cartItems.map(item => (
            <li key={item._id} className="product-item">
              <p className="product-name">{item.name} - Quantity: {item.quantity}</p>
              <p className="product-price">Price: ${item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="total">
          <h3 className="total-quantity">Total Quantity: {totalQuantities}</h3>
          <h3 className="total-price">Total Price: ${totalPrice}</h3>
        </div>
      </div>
      <div className="right-section">
        <h2 className="section-title">Enter Your Email</h2>
        <form className="email-form" onSubmit={handleProceedToPay}>
          <label htmlFor="email" className="email-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="email-input"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" className="proceed-button">Proceed to Pay</button>
        </form>
      </div>
    </div>
  );
};

export default CartBuy;
