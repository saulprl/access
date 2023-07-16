import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FirebaseAppProvider } from "reactfire";

import { ErrorPage } from "./error.tsx";

import { Root } from "./routes/root.tsx";
import { Index } from "./routes/index.tsx";
import { AuthCallback } from "./routes/auth-callback.tsx";
import { MigrationComplete } from "./routes/migration-complete.tsx";

import { firebaseConfig } from "./firebase.ts";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Index />} />
            <Route path="/migration-complete" element={<MigrationComplete />} />
            <Route path="/oauth/callback" element={<AuthCallback />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>,
);
