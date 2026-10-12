import React from "react";

const Education = () => {
  return (
    <div className="container " style={{ justifyContent: "space-between" }}>
      <div className="row p-2 ">
        <div className="col-6 ">
          <img src="media\education.svg" style={{ width: "30rem" }} alt="Market education illustration" />
        </div>
        <div className="col-6 " style={{ paddingTop: "5rem" }}>
          <h1>Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a
            className="p-2"
            style={{ width: "20%", textDecoration: "none" }}
            href="https://zerodha.com/varsity/"
          >
            Varsity
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>

          <p>
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>

          <a
            className="p-2"
            style={{ width: "20%", textDecoration: "none" }}
            href="https://tradingqna.com/"
          >
            TradingQ&A
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Education;
