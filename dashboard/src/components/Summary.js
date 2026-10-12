import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import GeneralContext from "./GeneralContext";

// Simple demo account: available cash is the starting balance minus holdings cost.
const OPENING_BALANCE = 100000;
const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const { refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    let active = true;
    const loadHoldings = async () => {
      try {
        setError("");
        const token = await getToken();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/holdings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (active) setHoldings(response.data);
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.error || "Unable to load holdings summary.");
      }
    };
    loadHoldings();
    return () => { active = false; };
  }, [getToken, refreshTrigger]);

  const investment = holdings.reduce((total, stock) => total + Number(stock.qty) * Number(stock.avg), 0);
  const currentValue = holdings.reduce((total, stock) => total + Number(stock.qty) * Number(stock.price), 0);
  const profitLoss = currentValue - investment;
  const profitLossPercent = investment > 0 ? (profitLoss / investment) * 100 : 0;
  const availableCash = OPENING_BALANCE - investment;
  const profitClass = profitLoss >= 0 ? "profit" : "loss";
  const profitSign = profitLoss > 0 ? "+" : "";

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      {error && <p className="loss" role="alert">{error}</p>}

      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3>{currency.format(availableCash)}</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>{currency.format(investment)}</span></p>
            <p>Opening balance <span>{currency.format(OPENING_BALANCE)}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Holdings ({holdings.length})</p></span>
        <div className="data">
          <div className="first">
            <h3 className={profitClass}>
              {profitSign}{currency.format(profitLoss)}
              <small> {profitSign}{profitLossPercent.toFixed(2)}%</small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>{currency.format(currentValue)}</span></p>
            <p>Investment <span>{currency.format(investment)}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
