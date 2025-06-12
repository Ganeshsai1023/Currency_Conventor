import React, { useState } from "react";
import Freecurrencyapi from "./Freecurrencyapi.jsx";

const App = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "Replace your API key which is taken from freecurrencyapi.com"; // Replace with your actual key
  const api = new Freecurrencyapi(API_KEY);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) return;
    setLoading(true);
    try {
      const data = await api.latest({ base_currency: from, currencies: to });
      const rate = data.data[to];
      const result = (parseFloat(amount) * rate).toFixed(2);
      setConverted(`${amount} ${from} = ${result} ${to}`);
    } catch (err) {
      console.error("Conversion error:", err);
      setConverted("Error during conversion.");
    } finally {
      setLoading(false);
    }
  };

  // Extended currency options
  const currencyOptions = [
    "USD", "EUR", "INR", "GBP", "CAD", "AUD", "JPY", "CNY", "SGD", "ZAR",
    "NZD", "CHF", "SEK", "NOK", "RUB", "BRL", "MXN", "AED", "HKD", "KRW"
  ];

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        {currencyOptions.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
      <span> to </span>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {currencyOptions.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
      <button onClick={handleConvert}>Convert</button>

      {loading && <p>Loading...</p>}
      {converted && <h3>{converted}</h3>}
    </div>
  );
};

export default App;
