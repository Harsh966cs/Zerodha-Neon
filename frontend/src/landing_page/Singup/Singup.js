import React from 'react'
import { SignUp } from "@clerk/clerk-react";
import { getDashboardRedirectUrl } from "../../config/urls";

const Singup = () => {
  return (
   <div className='container p-5'>
        <div className='row text-center' >
            <h1>Open a Zerodha account</h1>
            <p style={{color:"gray",marginTop:"30px",marginBottom:"30px"}}>Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&O trades.</p>
            <p style={{marginLeft:"33%"}}>
            <SignUp 
              routing="path"
              path="/singup"
              forceRedirectUrl={getDashboardRedirectUrl(process.env.REACT_APP_AFTER_SIGN_UP_URL)}
              signInUrl="/sign-in"
            />
            </p>
        </div>
    </div>
  )
}

export default Singup
