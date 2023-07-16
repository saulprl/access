import React from "react";
import ReactDOM from "react-dom/client";

import { FirebaseAppProvider } from "reactfire";

// import AppProviders from "./App.tsx";

import { firebaseConfig } from "./firebase.ts";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/root.tsx";
import { ErrorPage } from "./error.tsx";
import { Index } from "./routes/index.tsx";
import { AuthCallback } from "./routes/auth-callback.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Index /> },
      { path: "/oauth/callback", element: <AuthCallback /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <RouterProvider router={router} />
    </FirebaseAppProvider>
  </React.StrictMode>,
);
