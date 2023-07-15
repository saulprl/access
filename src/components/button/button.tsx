interface Props {
  variant?: "primary" | "secondary";
  className?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  variant = "primary",
  className,
  label,
  disabled = false,
  onClick,
}: Props) => {
  if (variant === "primary") {
    return (
      <PrimaryButton
        className={className}
        disabled={disabled}
        label={label}
        onClick={onClick}
      />
    );
  } else {
    return (
      <SecondaryButton
        className={className}
        disabled={disabled}
        label={label}
        onClick={onClick}
      />
    );
  }
};

const PrimaryButton = ({
  label,
  className,
  disabled,
  onClick,
}: Omit<Props, "variant">) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`group relative h-8 w-full cursor-pointer rounded-full bg-slate-400 transition-all hover:brightness-105 active:bg-slate-500 active:brightness-95 disabled:cursor-default disabled:brightness-100 ${
        className || ""
      }`}
    >
      <span className="absolute -top-1 left-0 flex h-full w-full flex-row items-center justify-center rounded-full bg-primary-700 text-slate-50 transition-all hover:-translate-y-px active:translate-y-1 active:bg-primary-800 group-disabled:translate-y-1 group-disabled:bg-gray-400 group-disabled:text-gray-100">
        {label}
      </span>
    </button>
  );
};

const SecondaryButton = ({
  label,
  className,
  disabled,
  onClick,
}: Omit<Props, "variant">) => {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`group relative h-8 w-full cursor-pointer rounded-full bg-slate-400 transition-all hover:brightness-105 active:bg-slate-500 active:brightness-95 disabled:cursor-default disabled:brightness-100 ${
        className || ""
      }`}
    >
      <span className="absolute -top-1 left-0 flex h-full w-full flex-row items-center justify-center rounded-full bg-slate-300 transition-all hover:-translate-y-px active:translate-y-1 active:bg-primary-50 group-disabled:translate-y-1 group-disabled:bg-gray-400 group-disabled:text-gray-100">
        {label}
      </span>
    </button>
  );
};
