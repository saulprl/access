import { LoadingSpinner } from "../loading-spinner";

import accessIcon from "../../assets/access-splash.png";

interface Props {
  message?: string;
  loading?: boolean;
}

export const Splash = ({ message, loading = false }: Props) => {
  return (
    <div className="flex min-h-full min-w-full flex-col items-center justify-end gap-4">
      <img
        src={accessIcon}
        width={350}
        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      />
      {loading && <LoadingSpinner />}
      {message && <p className="max-w-[90%] text-center">{message}</p>}
    </div>
  );
};
