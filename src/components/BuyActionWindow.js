import React, { useState, useEffect, useContext } from "react";
import api from "../api";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, marketPrice }) => {
  const { closeWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  // Auto-fill price when window opens
  useEffect(() => {
    setStockPrice(Number(marketPrice || 0));
    setStockQuantity(1);
  }, [marketPrice, uid]);

  const handleBuyClick = () => {
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
        mode: "BUY",
      })
      .then(() => {
        window.dispatchEvent(new Event("refreshHoldings"));
        closeWindow();
      })
      .catch(() => {
        alert("Failed to place buy order");
      });
  };

  const handleCancelClick = () => {
    closeWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
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
            <input type="number" step="0.05" value={stockPrice} disabled />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
          Total ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>

        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
