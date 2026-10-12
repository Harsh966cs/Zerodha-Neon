import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const frontendUrl = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

function AuthGate({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn === false) {
      window.location.assign(frontendUrl);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div style={{ padding: 24, fontFamily: "sans-serif" }}>
        Loading dashboard…
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div style={{ padding: 24, fontFamily: "sans-serif" }}>
        Redirecting to sign in…
      </div>
    );
  }

  return children;
}

if (!clerkPublishableKey) {
  root.render(
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      Missing <code>REACT_APP_CLERK_PUBLISHABLE_KEY</code> in{" "}
      <code>dashboard/.env</code>. Copy <code>dashboard/.env.example</code> to{" "}
      <code>dashboard/.env</code> and restart the dashboard.
    </div>
  );
} else {
  root.render(
    <React.StrictMode>
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        signUpFallbackRedirectUrl="/"
        signInFallbackRedirectUrl="/"
      >
        <AuthGate>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </AuthGate>
      </ClerkProvider>
    </React.StrictMode>
  );
}