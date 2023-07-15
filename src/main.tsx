import React from "react";
import ReactDOM from "react-dom/client";

import { FirebaseAppProvider } from "reactfire";

import AppProviders from "./App.tsx";

import { firebaseConfig } from "./firebase.ts";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AppProviders />
    </FirebaseAppProvider>
  </React.StrictMode>,
);
