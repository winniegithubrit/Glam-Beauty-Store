import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (location.state && location.state.totalAmount) {
      setAmount(location.state.totalAmount);
    }
  }, [location.state]);

  const handlePayment = () => {
    fetch("http://127.0.0.1:5000/initiate-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Payment initiated:", data);
        navigate("/success");
      })
      .catch((error) => {
        console.error("Error initiating payment:", error);
      });
  };

  return (
    <div className="payment-container">
      <h2>Proceed to Payment</h2>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="payment-input"
      />
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="payment-input"
        disabled
      />
      <button onClick={handlePayment} className="payment-btn">
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
