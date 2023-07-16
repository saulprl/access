import { useSigninCheck } from "reactfire";

import { Splash } from "../components/splash";
import { SignInButton } from "../components/sign-in-button";

import accessLogo from "../assets/csipro-access.png";
import { SignUp } from "../components/sign-up";

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
          <img src={accessLogo} className="w-full" />
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
          <SignUp />
        </>
      )}
      {/* <button
        className="absolute bottom-16 bg-slate-200 text-primary-700"
        onClick={() => setSignedIn((prev) => !prev)}
      >
        Toggle
      </button> */}
    </>
  );
};
