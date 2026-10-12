import React from "react";

const Team = () => {
  return (
    <div >
      <div style={{ textAlign: "center" }}>
        <h2 className="container center">People</h2>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <div className="container row" style={{margin:"auto"}} >
        <div className="col-6"  style={{alignItems:"center"}}>
          <img src='media\nithinKamath.jpg' style={{borderRadius:"50%",width:"400px"}} alt="Nithin Kamath"/>
          <br></br>
          <br></br>
          <h3 className="container" style={{marginLeft:"85px"}}>Nithin Kamath</h3>
           <p className="container" style={{marginLeft:"125px"}}>Founder, CEO </p>
        </div>
        <div className="col-6" >
          <h4>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </h4>
                    <br></br>
        <br></br>
          <h4>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </h4>
                     <br></br>
        <br></br>
          <h4>Playing basketball is his zen.</h4>
        </div>
      </div>
    </div>
  );
};

export default Team;
