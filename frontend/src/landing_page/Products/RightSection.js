import React from "react";
import { Link } from "react-router-dom";

const RightSection = ({productName,productDecription,demoLink,first,imageUrl}) => {
  return (
    <div
      className="container row p-5 "
      style={{ justifyContent: "center", display: "flex", margin: "auto" }}
    >
      <div className="col-6" style={{ padding: "100px" }}>
        <h1 style={{ padding: "2px" }}>{productName}</h1>
        <br></br>
        <h4 style={{ fontWeight: "normal" }}>{productDecription}</h4>
        <br></br>
        <div style={{ display: "flex" }}>
          {first && (
            <Link
              to={demoLink}
              style={{
                fontSize: "16px",
                color: "#387ed1",
                textDecoration: "none",
              }}
            >
              {first} <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </Link>
          )}
        </div>
      </div>
       <div className="col-6">
        <img src={imageUrl} />
      </div>
    </div>
  );
};

export default RightSection;
