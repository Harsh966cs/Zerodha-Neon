import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { getToken } = useAuth();
  const { refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const loadHoldings = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/holdings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllHoldings(response.data);
      } catch (error) {
        console.error("Unable to fetch holdings:", error);
      }
    };
    loadHoldings();
  }, [getToken, refreshTrigger]);

  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totals = allHoldings.reduce((result, stock) => {
    const quantity = Number(stock.qty);
    const averagePrice = Number(stock.avg);
    const currentPrice = Number(stock.price);
    result.investment += quantity * averagePrice;
    result.currentValue += quantity * currentPrice;
    return result;
  }, { investment: 0, currentValue: 0 });
  const profitLoss = totals.currentValue - totals.investment;
  const profitLossPercent = totals.investment > 0 ? (profitLoss / totals.investment) * 100 : 0;
  const formatMoney = (value) => Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const price = Number(stock.price);
            const qty = Number(stock.qty);
            const avg = Number(stock.avg);
            const curValue = price * qty;
            const isProfit = curValue - avg * qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = Number(stock.day) < 0 ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{qty}</td>
                <td>{avg.toFixed(2)}</td>
                <td>{price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - avg * qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{formatMoney(totals.investment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{formatMoney(totals.currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={profitLoss >= 0 ? "profit" : "loss"}>
            {formatMoney(profitLoss)} ({profitLoss > 0 ? "+" : ""}{profitLossPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
