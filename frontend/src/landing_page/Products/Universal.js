import React from "react";
import { Link } from "react-router-dom";
const Universal = () => {
  return (
    <div>
      <h3 style={{ textAlign: "center", fontWeight: "normal" }}>
        Want to know more about our technology stack? Check out the Zerodha.tech
        blog.
      </h3>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{ textAlign: "center" }}>The Zerodha Universe</h1>
      <br></br>

      <h4 style={{ textAlign: "center", fontWeight: "normal" }}>
        Extend your trading and investment experience even further with our
        partner platforms
      </h4>
      <br></br>
      <br></br>
      <div className="row" style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",padding:"150px"}}>
        <div className="col-4 " >
         <img src="media\zerodhaFundhouse.png" alt="Zerodha Fundhouse" />
          <p style={{textAlign:"center"}}>
            Our asset management venture <br></br>that is creating simple and transparent
            index <br></br>funds to help you save for your goals.
          </p>
          <br></br>
           <br></br>
            <br></br>
             <img src="media\streakLogo.png" width={"350px"} alt="Streak"/>
          <p style={{textAlign:"center"}}>
            Options trading platform that lets you <br></br>create strategies, analyze positions, and examine <br></br>data points like open interest, FII/DII, and more.
          </p>

        </div>
        <div className="col-4 " >
         <img src="media\sensibullLogo.svg" width={"450px"}  alt="Sensibull"/>
          <p style={{textAlign:"center"}}>
            Options trading platform that lets you <br></br>create strategies, analyze positions, and examine <br></br>data points like open interest, FII/DII, and more.
          </p>
          <br></br>
           <br></br>
            <br></br>
             <img src="media\smallcaseLogo.png" width={"350px"} alt="Smallcase" />
          <p style={{textAlign:"center"}}>
            Our asset management venture <br></br>that is creating simple and transparent
            index <br></br>funds to help you save for your goals.
          </p>
        </div>
       <div className="col-4 " >
         <img src="media\tijori.svg"  width={"350px"} style={{marginLeft:"50px"}} alt="Tijori"/>
          <p style={{textAlign:"center"}}>
              Investment research platform <br></br>that offers detailed insights on stocks, <br></br>
sectors, supply chains, and more.
          </p>
          <br></br>
           <br></br>
            <br></br>
             <img src="media\dittoLogo.png" width={"350px"} alt="Ditto" />
          <p style={{textAlign:"center"}}>
            Our asset management venture <br></br>that is creating simple and transparent
            index <br></br>funds to help you save for your goals.
          </p>
        </div>
        <br></br>
        <br></br>
        <Link to="/singup"  state={{alignItems:"center",display:"flex"}}>
           <button className='p-3 btn btn-primary' style={{width:"20%",margin:"0 auto",display:"flex",justifyContent:"center"}}>Singup Now</button>
           </Link>
      </div>
     
    </div>
  );
};

export default Universal;
