import { LoadingSpinner } from "../loading-spinner";

import accessIcon from "../../assets/access-splash.png";

interface Props {
  message?: string;
  loading?: boolean;
}

export const Splash = ({ message, loading = false }: Props) => {
  return (
    <>
      <img
        src={accessIcon}
        width={350}
        className="absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%]"
      />
      <div className="pb-16 flex w-full h-full flex-col items-center justify-end gap-4">
        {loading && <LoadingSpinner />}
        {message && <p className="max-w-[90%] text-center">{message}</p>}
      </div>
    </>
  );
};
