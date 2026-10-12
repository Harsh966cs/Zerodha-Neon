import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { getDashboardRedirectUrl } from "../../config/urls";

const Signin = () => (
  <div className="container p-5 d-flex justify-content-center">
    <SignIn
      routing="path"
      path="/sign-in"
      forceRedirectUrl={getDashboardRedirectUrl(process.env.REACT_APP_AFTER_SIGN_IN_URL)}
      signUpUrl="/singup"
    />
  </div>
);

export default Signin;
