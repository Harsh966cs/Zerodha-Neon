import React from 'react'
import { SignUp } from "@clerk/clerk-react";
import { getDashboardRedirectUrl } from "../../config/urls";

const Singup = () => {
  return (
    <main className="signup-page">
      <div className="signup-page__content">
        <h1>Open a Zerodha account</h1>
        <p className="signup-page__description">
          Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&amp;O trades.
        </p>
        <div className="signup-page__form">
          <SignUp
            routing="path"
            path="/singup"
            forceRedirectUrl={getDashboardRedirectUrl(process.env.REACT_APP_AFTER_SIGN_UP_URL)}
            signInUrl="/sign-in"
            appearance={{ elements: { rootBox: "signup-clerk-root" } }}
          />
        </div>
      </div>
    </main>
  )
}

export default Singup
