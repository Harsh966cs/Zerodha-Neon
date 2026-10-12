import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landing_page/Home/HomePage';
import Singup from  '../src/landing_page/Singup/Singup';
import Pricing from  '../src/landing_page/Pricing/PricingPage';
import About from    '../src/landing_page/About/About';
import Products from  '../src/landing_page/Products/ProductPage'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Footer from './landing_page/Footer';
import Navbar1 from './landing_page/Navbar';
import Signin from "./landing_page/Signin/Signin";
import { getDashboardRedirectUrl } from "./config/urls";

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const afterSignUpUrl = getDashboardRedirectUrl(process.env.REACT_APP_AFTER_SIGN_UP_URL);

// --- Access control: only these hosts may view the app ---
// Edit / extend via REACT_APP_ALLOWED_HOSTS (comma-separated) in your env.
const DEFAULT_ALLOWED_HOSTS = [
  "zerodha-neon-five.vercel.app",
  "localhost",
  "127.0.0.1",
];
const extraHosts = (process.env.REACT_APP_ALLOWED_HOSTS || "")
  .split(",")
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);
const allowedHosts = new Set(
  [...DEFAULT_ALLOWED_HOSTS, ...extraHosts].map((h) => h.toLowerCase())
);

const isAllowedHost = () => {
  if (typeof window === "undefined") return true; // SSR/test safety
  return allowedHosts.has(window.location.hostname.toLowerCase());
};


const appContent = (
  <BrowserRouter>
    <Navbar1 />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/singup/*" element={<Singup/>}/>
      <Route path="/sign-in/*" element={<Signin/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
    </Routes>
    <hr></hr>
    <br></br>
    <br></br>
    <Footer/>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!isAllowedHost()) {
  root.render(
    <div
      style={{
        padding: 24,
        fontFamily: "sans-serif",
        maxWidth: 560,
        margin: "15vh auto",
        textAlign: "center",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ color: "#d32f2f" }}>Access Denied</h1>
      <p>
        This site is only available from authorised domains. If you believe
        this is a mistake, please contact the site owner.
      </p>
    </div>
  );
} else if (!clerkPublishableKey) {
  root.render(
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      Missing <code>REACT_APP_CLERK_PUBLISHABLE_KEY</code> in{" "}
      <code>frontend/.env</code>. Copy <code>frontend/.env.example</code> to{" "}
      <code>frontend/.env</code> and restart the frontend.
    </div>
  );
} else {
  root.render(
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signUpUrl="/singup"
      signInUrl="/sign-in"
      signUpFallbackRedirectUrl={afterSignUpUrl}
      signInFallbackRedirectUrl={afterSignUpUrl}
      signUpForceRedirectUrl={afterSignUpUrl}
      signInForceRedirectUrl={getDashboardRedirectUrl(process.env.REACT_APP_AFTER_SIGN_IN_URL)}
    >
      {appContent}
    </ClerkProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

