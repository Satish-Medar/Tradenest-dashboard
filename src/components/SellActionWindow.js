import React, { useState, useEffect, useContext } from "react";
import api from "../api";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid, marketPrice }) => {
  const { closeWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  useEffect(() => {
    setStockPrice(Number(marketPrice || 0));
    setStockQuantity(1);
  }, [marketPrice, uid]);

  const handleSellClick = () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (qty <= 0 || price <= 0) {
      alert("Please enter valid quantity and price");
      return;
    }

    api
      .post("/newOrder", {
        name: uid,
        qty,
        price,
        mode: "SELL",
      })
      .then(() => {
        // 🔥 refresh holdings instantly
        window.dispatchEvent(new Event("refreshHoldings"));
        closeWindow();
      })
      .catch(() => {
        alert("Insufficient holdings to place a sell order.");
      });
  };

  const handleCancelClick = () => {
    closeWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Price (per share)</legend>
            <input type="number" value={stockPrice} disabled />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          Total ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>

        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
