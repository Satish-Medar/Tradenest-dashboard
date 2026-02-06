import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/allOrders")
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        setOrders([]);
      });
  }, []);

  // No orders state
  if (!orders || orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              {/* <th>Avg Price</th>
              <th>Total</th> */}
              {/* <th>Cur Value</th>
              <th>P&amp;L</th> */}
              <th>Net</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => {
              const qty = Number(order.qty ?? 0);
              const avg = Number(order.avg ?? 0);
              const price = Number(order.price ?? 0);

              const total = avg * qty;
              const curValue = price * qty;
              const pnl = curValue - total;

              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = order.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{qty}</td>
                  {/* <td>{avg.toFixed(2)}</td>
                  <td>{total.toFixed(2)}</td> */}
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  {/* <td className={dayClass}>
                    {Number(order.net ?? 0).toFixed(2)}
                  </td>
                  <td className={profClass}>
                    {Number(order.profit ?? 0).toFixed(2)}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
