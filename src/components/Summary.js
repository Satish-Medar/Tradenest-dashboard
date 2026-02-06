import React, { useEffect, useState } from "react";
import api from "../api";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    api.get("/allHoldings").then((res) => {
      setHoldings(res.data);
    });
  }, []);

  const investment = holdings.reduce((sum, h) => sum + h.qty * h.avg, 0);

  const currentValue = holdings.reduce((sum, h) => sum + h.qty * h.price, 0);

  const pnl = currentValue - investment;
  const pnlPercent =
    investment > 0 ? ((pnl / investment) * 100).toFixed(2) : "0.00";

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              ₹{pnl.toFixed(2)} <small>{pnlPercent}%</small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{currentValue.toFixed(2)}</span>
            </p>
            <p>
              Investment <span>₹{investment.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
