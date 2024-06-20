import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "toastify-js/src/toastify.css";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ThemeProvider from "./context/themeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId="747893251725-d9k7pnq4bn6sgaa5kponmd6l8hkhesio.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
