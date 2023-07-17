// import { GithubAuthProvider, getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { IconContext } from "react-icons";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useAuth } from "reactfire";
// import { useFirebaseApp } from "reactfire";

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
  const auth = useAuth();

  const [buttonText, setButtonText] = useState(`Sign in with ${provider}`);
  let timer: ReturnType<typeof setTimeout> | null;

  const handleEmailClick = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setButtonText("Nope - wrong option");
    timer = setTimeout(() => {
      setButtonText(`Sign in with ${provider}`);
    }, 5000);
  };

  const handleGitHubClick = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID as string;
    const callbackUrl = import.meta.env.VITE_GITHUB_CALLBACK_URL as string;

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl,
    )}&scope=user:email`;
    window.location.href = authUrl;
  };

  const handleGoogleClick = async () => {
    const google = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, google);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      toast.error("Unable to sign in with Google");
      return;
    }
  };

  const handleClick = () => {
    switch (provider) {
      case "email":
        handleEmailClick();
        break;
      case "GitHub":
        handleGitHubClick();
        break;
      case "Google":
        void handleGoogleClick();
        break;
      default:
        toast.error("I don't know what you clicked wth");
        break;
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
