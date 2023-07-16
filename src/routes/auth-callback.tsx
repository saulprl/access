/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useEffect } from "react";

import {
  GithubAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";

import { useFirebaseApp } from "reactfire";
import { useNavigate } from "react-router-dom";
import { Splash } from "../components/splash";

export const AuthCallback = () => {
  const auth = getAuth(useFirebaseApp());
  const navigate = useNavigate();

  const handleGitHubCallback = useCallback(
    async (code: string) => {
      const uri = new URL("https://github.com/login/oauth/access_token");
      uri.searchParams.append(
        "client_id",
        import.meta.env.VITE_GITHUB_CLIENT_ID as string,
      );
      uri.searchParams.append(
        "client_secret",
        import.meta.env.VITE_GITHUB_CLIENT_SECRET as string,
      );
      uri.searchParams.append("code", code);
      uri.searchParams.append(
        "redirect_uri",
        import.meta.env.VITE_GITHUB_CALLBACK_URL as string,
      );

      const res = await fetch(uri, {
        method: "POST",
        headers: { Accept: "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token as string;
        const credential = GithubAuthProvider.credential(token);
        await signInWithCredential(auth, credential);
      }

      navigate("/");
    },
    [auth, navigate],
  );

  useEffect(() => {
    console.log("lol");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      void handleGitHubCallback(code);
    }
  }, [handleGitHubCallback]);

  return <Splash loading message="Authenticating..." />;
};
