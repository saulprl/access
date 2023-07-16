import { useSigninCheck } from "reactfire";

import { Splash } from "../components/splash";
import { SignInButton } from "../components/sign-in-button";

import accessLogo from "../assets/csipro-access.png";
import { FirestoreCheck } from "../components/firestore-check";

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
          <img src={accessLogo} className="mt-12 w-full" />
          <div className="absolute bottom-28 flex w-full flex-col gap-4 sm:bottom-16">
            <SignInButton provider="GitHub" />
            <SignInButton provider="Google" />
            <SignInButton provider="email" />
          </div>
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
