import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const { getToken } = useAuth();
  const { refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/positions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPositions(response.data);
      } catch (error) {
        console.error("Unable to fetch positions:", error);
      }
    };
    loadPositions();
  }, [getToken, refreshTrigger]);

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positions.map((stock, index) => {
            const price = Number(stock.price);
            const qty = Number(stock.qty);
            const avg = Number(stock.avg);
            const curValue = price * qty;
            const isProfit = curValue - avg * qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{qty}</td>
                <td>{avg.toFixed(2)}</td>
                <td>{price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - avg * qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
