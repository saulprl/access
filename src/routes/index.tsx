import { useSigninCheck } from "reactfire";

import { FirestoreCheck } from "../components/firestore-check";
import { SignInButton } from "../components/sign-in-button";
import { Splash } from "../components/splash";

import accessLogo from "../assets/csipro-access.png";
import branding from "../assets/csipro.svg";

export const Index = () => {
  const { status, data: signInCheck, error } = useSigninCheck();

  if (status === "loading") {
    return <Splash loading />;
  }

  if (error) {
    return <Splash message="Error connecting to the Auth service" />;
  }

  return (
    <>
      {!signInCheck.signedIn && (
        <>
          <div className="w-full pt-20">
            <img src={accessLogo} className="w-full" />
          </div>
          <div className="absolute bottom-36 flex w-full flex-col gap-4 sm:bottom-20">
            <SignInButton provider="GitHub" />
            <SignInButton provider="Google" />
            <SignInButton provider="email" />
          </div>
          <img
            src={branding}
            className="absolute bottom-20 left-1/2 mx-auto w-1/12 -translate-x-1/2 sm:bottom-5"
          />
        </>
      )}
      {signInCheck.signedIn && (
        <>
          <Splash />
          <FirestoreCheck userUid={signInCheck.user.uid} />
        </>
      )}
    </>
  );
};
