import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (stock) => {},
  openSellWindow: (stock) => {},
  closeWindow: () => {},
  selectedStock: null,
  actionType: null, // "BUY" | "SELL"
});

export const GeneralContextProvider = ({ children }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionType, setActionType] = useState(null); // BUY or SELL

  const openBuyWindow = (stock) => {
    setSelectedStock(null);
    setActionType(null);

    setSelectedStock(stock);
    setActionType("BUY");
  };

  const openSellWindow = (stock) => {
    setSelectedStock(null);
    setActionType(null);

    setSelectedStock(stock);
    setActionType("SELL");
  };

  const closeWindow = () => {
    setSelectedStock(null);
    setActionType(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        openSellWindow,
        closeWindow,
        selectedStock,
        actionType,
      }}
    >
      {children}

      {selectedStock && actionType === "BUY" && (
        <BuyActionWindow
          key={`BUY-${selectedStock.name}`}
          uid={selectedStock.name}
          marketPrice={selectedStock.price}
        />
      )}

      {selectedStock && actionType === "SELL" && (
        <SellActionWindow
          key={`SELL-${selectedStock.name}`}
          uid={selectedStock.name}
          marketPrice={selectedStock.price}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
