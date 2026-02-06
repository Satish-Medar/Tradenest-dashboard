import React, { useState, useEffect } from "react";
import api from "../api";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  const fetchHoldings = () => {
    api.get("/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  };

  useEffect(() => {
    fetchHoldings();

    // listen to refresh event
    window.addEventListener("refreshHoldings", fetchHoldings);

    return () => {
      window.removeEventListener("refreshHoldings", fetchHoldings);
    };
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "LTP",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {allHoldings.length === 0 ? (
        <p>No holdings</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                {/* <th>P&L</th> */}
              </tr>
            </thead>

            <tbody>
              {allHoldings.map((stock, index) => {
                const curValue = stock.qty * stock.price;
                const invested = stock.qty * stock.avg;
                const pnl = curValue - invested;
                const pnlClass = pnl >= 0 ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    {/* <td className={pnlClass}>{pnl.toFixed(2)}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;
