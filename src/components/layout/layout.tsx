import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-slate-200">
      <div className="relative mx-auto h-full w-screen overflow-hidden border-slate-400 bg-primary-700 text-slate-200 shadow-md sm:h-[90%] sm:max-w-md sm:rounded-lg sm:border">
        {children}
      </div>
    </div>
  );
};
