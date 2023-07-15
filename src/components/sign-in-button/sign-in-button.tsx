import { useState } from "react";

import { IconContext } from "react-icons";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

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

export const SignInButton = (props: {
  provider: "GitHub" | "Google" | "email";
}) => {
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
        className="relative mx-8 h-14 cursor-pointer rounded-full bg-slate-400 py-4 font-auth font-medium text-primary-700 transition-colors hover:brightness-105 active:bg-slate-500 active:brightness-95"
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
