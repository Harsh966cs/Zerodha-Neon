import React, { useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ stock, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(Number(stock?.price || 0));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [priceConfirmationOpen, setPriceConfirmationOpen] = useState(false);
  const { getToken } = useAuth();
  const { closeBuyWindow, triggerRefresh } = useContext(GeneralContext);
  const orderType = mode.toUpperCase() === "SELL" ? "SELL" : "BUY";

  const submitOrder = async () => {
    try {
      setError("");
      setSubmitting(true);
      const token = await getToken();
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/${orderType.toLowerCase()}`,
        { symbol: stock.symbol, qty: Number(stockQuantity), price: Number(stockPrice) },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      triggerRefresh();
      closeBuyWindow();
    } catch (requestError) {
      setError(requestError.response?.data?.error || `Unable to place ${orderType.toLowerCase()} order.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    const quantity = Number(stockQuantity);
    const price = Number(stockPrice);
    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Enter a whole share quantity of at least 1.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setError("Enter a valid price per share greater than zero.");
      return;
    }

    setError("");
    if (Math.abs(price - Number(stock.price)) > 0.01) {
      setPriceConfirmationOpen(true);
      return;
    }
    submitOrder();
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window">
      <div className="regular-order">
        <h3>{orderType} {stock?.symbol}</h3>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              step="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price per share (₹)</legend>
            <input
              type="number"
              name="price"
              id="price"
              min="0.01"
              step="0.01"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="buttons">
        <span>Estimated total: ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>
        <div>
          <button type="button" className="btn btn-blue" onClick={handleSubmit} disabled={submitting || !Number.isInteger(Number(stockQuantity)) || Number(stockQuantity) < 1 || !Number.isFinite(Number(stockPrice)) || Number(stockPrice) <= 0}>
            {submitting ? "Submitting…" : orderType}
          </button>
          <button type="button" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
      <Dialog open={priceConfirmationOpen} onClose={() => setPriceConfirmationOpen(false)} aria-labelledby="price-confirmation-title">
        <DialogTitle id="price-confirmation-title">Check the order price</DialogTitle>
        <DialogContent dividers>
          <Typography>
            The entered price of ₹{Number(stockPrice).toFixed(2)} per share differs from {stock.symbol}&apos;s displayed quote of ₹{Number(stock.price).toFixed(2)}.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Your estimated total is ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}. Review the amount before placing this order.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPriceConfirmationOpen(false)}>Edit price</Button>
          <Button onClick={() => { setPriceConfirmationOpen(false); submitOrder(); }} variant="contained" disabled={submitting}>
            Place {orderType.toLowerCase()} order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyActionWindow;
