import { useState } from "react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

import accessLogo from "./assets/csipro-access.png";
import github from "./assets/auth-providers/github-mark.png";
import google from "./assets/auth-providers/google-g.png";
import { IconContext } from "react-icons";

function App() {
  return (
    <div className="absolute h-screen w-screen max-w-md overflow-hidden bg-primary-700 pb-8 pt-20 text-slate-200 md:left-[50%] md:top-[50%] md:h-auto md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-lg">
      <img src={accessLogo} className="w-full" />
      <div className="mt-40 flex flex-col gap-4 md:mt-20">
        <SignInButton provider="GitHub" />
        <SignInButton provider="Google" />
        <SignInButton provider="email" />
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
        <span className="absolute -top-1 left-0 flex h-full w-full flex-row items-center justify-center rounded-full bg-white pl-8 transition-transform active:translate-y-1 active:bg-primary-50">
          <span className="absolute left-6">{providerLogos[provider]}</span>
          <span className="">
            <span className="mx-auto">{buttonText}</span>
          </span>
        </span>
      </button>
    </IconContext.Provider>
  );
};

export default App;
