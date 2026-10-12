import React from "react";
import { Link } from "react-router-dom";

const LeftSection = ({
  imageUrl,
  productName,
  productDecription,
  demoLink,
  lernMoreLink,
  getPlayStoreLink,
  getApplestoreLink,
  first,
  second,
}) => {
  return (
    <div className="container row p-5 " style={{justifyContent:"center",display:"flex",margin:"auto"}}>
      <div className="col-6">
        <img src={imageUrl} alt={productName} />
      </div>
      <div className="col-6" style={{padding:"100px"}}>
        <h1 style={{padding:"2px"}}>{productName}</h1>
        <br></br>
        <h4 style={{fontWeight: "normal" }}>{productDecription}</h4>
         <br></br>
         <div style={{ display:"flex"}}>
               {first && <Link to={demoLink} style={{fontSize:"16px",color:"#387ed1", textDecoration:"none"}}>{first}  <i className="fa fa-arrow-right" aria-hidden="true"></i></Link>}
               {second &&<Link to={lernMoreLink} style={{fontSize:"16px",color:"#387ed1",marginLeft:"30px",textDecoration:"none"}}>{second}  <i className="fa fa-arrow-right" aria-hidden="true"></i></Link>}
         </div>
         <br></br>
           <div style={{display:"flex"}}>
            {" "}
            <Link to={getPlayStoreLink}><img src="media/googlePlayBadge.svg" style={{ width: "10rem" }} alt="Get it on Google Play" /></Link> &nbsp;&nbsp; &nbsp;
            <Link to={getPlayStoreLink}><img src="media/appstoreBadge.svg"  style={{width:"9rem"}} alt="Download on the App Store"/></Link>
          </div>
      </div>
    </div>
  );
};

export default LeftSection;
