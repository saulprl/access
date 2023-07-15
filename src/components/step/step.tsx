import { ReactNode } from "react";

export const Step = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex h-full w-full flex-[0_0_100%] text-primary-700 transition-transform duration-500 ${
        className || ""
      }`}
    >
      <StepContent>{children}</StepContent>
    </div>
  );
};

export const StepContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`mx-auto flex max-w-[90%] flex-col items-center justify-center gap-2 sm:max-w-[60%] ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};
