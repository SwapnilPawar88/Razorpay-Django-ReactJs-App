import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await axios.post("http://127.0.0.1:8000/razorpay_order", {
      "order_id" : "OD-A10751"
  });

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
   const {merchantId=null , amount=null,currency=null,orderId=null } = result.data;

  const options = {
      key: merchantId,
      amount: amount.toString(),
      currency: currency,
      name: "Razorpay Testing",
      description: "Test Transaction",
      image: { logo },
      order_id: orderId,
      callback_url: "http://127.0.0.1:8000/razorpay_callback",
      redirect: true,
      prefill: {
        name: "Swapnil Pawar",
        email: "swapnil@example.com",
        contact: "9999999999",
    },
      notes: {
          address: "None",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Try Razorpay!</p>
                <button className="App-link" onClick={displayRazorpay}>
                    Pay Now 
                </button>
            </header>
        </div>
    );
}

export default App;