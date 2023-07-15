interface Props {
  variant?: "primary" | "secondary";
  label: string;
  onClick: () => void;
}

export const Button = ({ variant = "primary", label, onClick }: Props) => {
  if (variant === "primary") {
    return <PrimaryButton label={label} onClick={onClick} />;
  } else {
    return <SecondaryButton label={label} onClick={onClick} />;
  }
};

const PrimaryButton = ({ label, onClick }: Omit<Props, "variant">) => {
  return (
    <button
      onClick={onClick}
      className="relative h-8 w-full cursor-pointer rounded-full bg-slate-400 transition-all hover:brightness-105 active:bg-slate-500 active:brightness-95"
    >
      <span className="absolute -top-1 left-0 flex h-full w-full flex-row items-center justify-center rounded-full bg-primary-700 text-slate-50 transition-all hover:-translate-y-px active:translate-y-1 active:bg-primary-800">
        {label}
      </span>
    </button>
  );
};

const SecondaryButton = ({ label, onClick }: Omit<Props, "variant">) => {
  return (
    <button
      onClick={onClick}
      className="relative h-8 w-full cursor-pointer rounded-full bg-slate-400 transition-all hover:brightness-105 active:bg-slate-500 active:brightness-95"
    >
      <span className="absolute -top-1 left-0 flex h-full w-full flex-row items-center justify-center rounded-full bg-slate-300 transition-all hover:-translate-y-px active:translate-y-1 active:bg-primary-50">
        {label}
      </span>
    </button>
  );
};
