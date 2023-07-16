/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";

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
      try {
        const serverUrl = `${
          import.meta.env.VITE_GITHUB_CALLBACK_URL as string
        }/?code=${code}`;

        const response = await axios.post(
          serverUrl,
          {},
          { headers: { Accept: "application/json" } },
        );

        if (response.status === 200) {
          const token = response.data.accessToken as string;

          const credential = GithubAuthProvider.credential(token);
          await signInWithCredential(auth, credential);
        }
      } catch (error) {
        console.error(error);
      } finally {
        navigate("/");
      }
    },
    [auth, navigate],
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      void handleGitHubCallback(code);
    }
  }, [handleGitHubCallback]);

  return <Splash loading message="Authenticating..." />;
};
