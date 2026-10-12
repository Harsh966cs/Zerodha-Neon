import React from "react";

function Brokerage() {
  return (
    <div>
      {" "}
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "150px",
        }}
      >
        <div className="col-4 ">
          <img src="media\pricing0.svg" alt="Pricing illustration" />
          <br></br>
          <br></br>
          <h1 style={{ textAlign: "center" }}>Free equity delivery</h1>
          <br></br>
          <h3 style={{ fontWeight: "normal",fontSize:"24px",textAlign:"center"}}>
       All equity delivery investments (NSE, BSE), <br></br>
          are absolutely free — ₹ 0 brokerage.
      </h3>
        </div>
        <div className="col-4 ">
          <img src="media\intradayTrades.svg" alt="Intraday and F&O trades"/>
          <br></br>
          <br></br>
             <h1 style={{ textAlign: "center" }}>Intraday and F&O trades</h1>
    
          
           <h3 style={{ fontWeight: "normal",fontSize:"24px",textAlign:"center"}}>
      Flat ₹ 20 or 0.03% (whichever is lower) per <br></br>executed order on intraday trades across <br></br>equity, currency, and commodity trades. Flat<br></br> ₹20 on all option trades.
      </h3>
        </div>
        <div className="col-4 ">
          <img src="media\pricing0.svg" alt="Pricing illustration" />
          <br></br>
          <br></br>
          <h1 style={{ textAlign: "center" }}>Free direct MF</h1>
          <br></br>
          
           <h3 style={{ fontWeight: "normal",fontSize:"24px",textAlign:"center"}}>
      All direct mutual fund investments are <br></br>executed order on intraday trades across <br></br>  absolutely free — ₹ 0 commissions & DP<br></br>  charges.
      </h3>

        </div>
      </div>
    </div>
  );
}

export default Brokerage;
