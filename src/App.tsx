import { useState } from "react";

import { IconContext } from "react-icons";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

import accessLogo from "./assets/csipro-access.png";
import accessIcon from "./assets/access-splash.png";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="relative flex h-full w-screen items-center justify-center bg-slate-200">
      <div className="relative h-full w-screen max-w-md overflow-hidden border border-slate-400 bg-primary-700 pb-20 pt-20 text-slate-200 shadow-md md:max-h-[90%] md:rounded-lg md:pb-4">
        {!signedIn && (
          <>
            <img src={accessLogo} className="w-full" />
            <div className="mt-40 flex flex-col gap-4 md:mt-20">
              <SignInButton provider="GitHub" />
              <SignInButton provider="Google" />
              <SignInButton provider="email" />
            </div>
          </>
        )}
        {signedIn && (
          <>
            <Splash />
            <WelcomePage />
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

const providerLogos = {
  GitHub: (
    <span className="text-github">
      <FaGithub />
    </span>
  ),
  Google: <FcGoogle />,
  email: (
    <span className="text-zinc-400">
      <MdEmail />
    </span>
  ),
};

const SignInButton = (props: { provider: "GitHub" | "Google" | "email" }) => {
  const { provider } = props;

  const [buttonText, setButtonText] = useState(`Sign in with ${provider}`);
  let timer: ReturnType<typeof setTimeout> | null = null;

  const handleClick = () => {
    if (provider === "email") {
      if (timer) {
        clearTimeout(timer);
      }

      setButtonText("Nope - wrong option");
      timer = setTimeout(() => {
        setButtonText(`Sign in with ${provider}`);
      }, 5000);
    }
  };

  return (
    <IconContext.Provider value={{ className: "text-3xl" }}>
      <button
        className="cursor relative mx-8 h-14 rounded-full bg-slate-300 py-4 font-auth font-medium text-primary-700 transition-colors hover:brightness-100 active:bg-primary-50"
        onClick={handleClick}
      >
        <span className="absolute -top-1 left-0 flex h-full w-full flex-row items-center justify-center rounded-full bg-white pl-4 transition-transform hover:-translate-y-px active:translate-y-1 active:bg-primary-50">
          <span className="absolute left-6">{providerLogos[provider]}</span>
          <span className="mx-auto">{buttonText}</span>
        </span>
      </button>
    </IconContext.Provider>
  );
};

const Splash = (props: { message?: string }) => {
  const { message } = props;

  return (
    <div className="flex min-h-full flex-col items-center justify-end gap-4">
      <img
        src={accessIcon}
        width={350}
        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      />
      <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-x-white border-y-transparent" />
      <p>lol</p>
      {message && <p>{message}</p>}
    </div>
  );
};

const WelcomePage = () => {
  return (
    <div className="absolute top-0 flex min-h-full w-full translate-x-[100%] animate-slide-in flex-col items-center justify-end gap-4 bg-white">
      <p>lol</p>
    </div>
  );
};

export default App;
