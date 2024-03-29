import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import { MovieContextProvider } from "./movieContext/MovieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <AuthContextProvider>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </AuthContextProvider>
  //</React.StrictMode>
);
