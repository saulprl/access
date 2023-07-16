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
    async (token: string) => {
      const credential = GithubAuthProvider.credential(token);
      await signInWithCredential(auth, credential);

      navigate("/");
    },
    [auth, navigate],
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");

    if (token) {
      void handleGitHubCallback(token);
    }
  }, [handleGitHubCallback]);

  return <Splash loading message="Authenticating..." />;
};
