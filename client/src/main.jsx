import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="747893251725-d9k7pnq4bn6sgaa5kponmd6l8hkhesio.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
