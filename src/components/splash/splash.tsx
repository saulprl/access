import { LoadingSpinner } from "../loading-spinner";

import accessIcon from "../../assets/access-fg.svg";
import branding from "../../assets/csipro.svg";

interface Props {
  message?: string;
  loading?: boolean;
}

export const Splash = ({ message, loading = false }: Props) => {
  return (
    <>
      <img
        src={accessIcon}
        className="absolute left-[50%] top-[40%] w-11/12 translate-x-[-50%] translate-y-[-50%]"
      />
      <div className="flex h-full w-full flex-col items-center justify-end gap-4 pb-32 sm:pb-16">
        {loading && <LoadingSpinner />}
        {message && <p className="max-w-[90%] text-center">{message}</p>}
      </div>
      <img
        src={branding}
        className="absolute bottom-20 left-1/2 mx-auto w-1/12 -translate-x-1/2 sm:bottom-5"
      />
    </>
  );
};
