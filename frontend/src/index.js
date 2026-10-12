import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landing_page/Home/HomePage';
import Singup from  '../src/landing_page/Singup/Singup';
import Pricing from  '../src/landing_page/Pricing/PricingPage';
import About from    '../src/landing_page/About/About';
import Products from  '../src/landing_page/Products/ProductPage'
import Support from '../src/landing_page/Support/Support'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Footer from './landing_page/Footer';
import Navbar1 from './landing_page/Navbar';
import Signin from "./landing_page/Signin/Signin";

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const afterSignUpUrl = process.env.REACT_APP_AFTER_SIGN_UP_URL || "http://localhost:3001/";

const appContent = (
  <BrowserRouter>
    <Navbar1 />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/singup/*" element={<Singup/>}/>
      <Route path="/sign-in/*" element={<Signin/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/support' element={<Support/>}/>
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

if (!clerkPublishableKey) {
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
    >
      {appContent}
    </ClerkProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

