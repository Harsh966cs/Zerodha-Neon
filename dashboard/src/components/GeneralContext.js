import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  refreshTrigger: 0,
  triggerRefresh: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState({ symbol: "", price: 0, id: null });
  const [orderMode, setOrderMode] = useState("BUY");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenBuyWindow = (stockOrSymbol, mode = "BUY", defaultPrice = null) => {
    let stockData = { symbol: "", price: 0, id: null };
    if (typeof stockOrSymbol === "object" && stockOrSymbol !== null) {
      stockData = {
        symbol: stockOrSymbol.symbol || stockOrSymbol.name || "",
        price: Number(stockOrSymbol.price || defaultPrice || 0),
        id: stockOrSymbol.id || null,
      };
    } else {
      stockData = {
        symbol: String(stockOrSymbol || ""),
        price: Number(defaultPrice || 0),
        id: null,
      };
    }

    setSelectedStock(stockData);
    setOrderMode(mode.toUpperCase() === "SELL" ? "SELL" : "BUY");
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock({ symbol: "", price: 0, id: null });
  };

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        refreshTrigger,
        triggerRefresh,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          stock={selectedStock}
          mode={orderMode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
