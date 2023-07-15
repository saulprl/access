import { useState } from "react";

import { SignInButton } from "./components/sign-in-button";
import { Splash } from "./components/splash";

import accessLogo from "./assets/csipro-access.png";
import { SignUp } from "./components/sign-up";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="flex h-full items-center justify-center bg-slate-200">
      <div className="relative overflow-hidden mx-auto h-full w-screen border-slate-400 bg-primary-700 pb-20 pt-20 text-slate-200 shadow-md sm:h-[90%] sm:max-h-[90%] sm:max-w-md sm:rounded-lg sm:border sm:pb-4">
        {!signedIn && (
          <>
            <img src={accessLogo} className="w-full" />
            <div className="absolute bottom-28 flex w-full flex-col gap-4 sm:bottom-16">
              <SignInButton provider="GitHub" />
              <SignInButton provider="Google" />
              <SignInButton provider="email" />
            </div>
          </>
        )}
        {signedIn && (
          <>
            <Splash />
            <SignUp />
          </>
        )}
        <button
          className="absolute bottom-16 bg-slate-200 text-primary-700"
          onClick={() => setSignedIn((prev) => !prev)}
        >
          Toggle
        </button>
      </div>
    </div>
  );
}

export default App;
