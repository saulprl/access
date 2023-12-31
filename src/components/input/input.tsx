import {
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";

import { IconContext } from "react-icons";

import { AiOutlineQuestionCircle } from "react-icons/ai";

interface Props {
  id: string;
  label: string;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  icon: ReactNode;
  tooltip?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  maxLength?: number;
  defaultValue?: InputHTMLAttributes<HTMLInputElement>["defaultValue"];
}

export const Input: FC<Props> = ({
  id,
  label,
  value,
  icon,
  tooltip,
  placeholder,
  error,
  maxLength,
  defaultValue,
  onChange,
  disabled = false,
  type = "text",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (disabled) return;

    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <IconContext.Provider
      value={{
        className: `${
          disabled
            ? "text-slate-400"
            : isFocused
            ? "text-primary-700"
            : "text-slate-900"
        } text-2xl transition-colors duration-200`,
      }}
    >
      <div className="w-full">
        <div
          className={` relative flex flex-row items-center rounded-full border p-3 pl-12 transition-colors duration-200 ${
            disabled
              ? "border-slate-400"
              : isFocused
              ? "border-primary-700"
              : "border-slate-900"
          } ${tooltip ? "pr-9" : "pr-3"}`}
        >
          <span className="absolute left-3">{icon}</span>
          <input
            id={id}
            defaultValue={defaultValue}
            disabled={disabled}
            className="peer/input group w-full appearance-none bg-transparent placeholder-slate-400 placeholder-opacity-0 outline-none focus:placeholder-opacity-100"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={type}
            maxLength={maxLength}
          />
          <label
            htmlFor={id}
            className="absolute left-10 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-slate-100 px-2 text-slate-900 duration-300 peer-placeholder-shown/input:top-1/2 peer-placeholder-shown/input:-translate-y-1/2 peer-placeholder-shown/input:scale-100 peer-focus/input:top-2 peer-focus/input:-translate-y-5 peer-focus/input:scale-75 peer-focus/input:text-primary-700 peer-disabled/input:text-slate-400 "
          >
            {label}
          </label>
          {tooltip && (
            <IconContext.Provider
              value={{
                className: `${
                  disabled
                    ? "text-slate-400"
                    : isFocused
                    ? "text-secondary"
                    : "text-slate-900"
                } text-base transition-colors duration-200`,
              }}
            >
              <span className="peer/tooltip absolute right-3">
                <AiOutlineQuestionCircle />
              </span>
              {!disabled && (
                <span className="absolute bottom-12 right-3 z-20 block max-w-[80%] scale-90 rounded-lg bg-slate-600 p-2 text-right text-xs text-slate-300 opacity-0 transition-all duration-200 peer-hover/tooltip:scale-100 peer-hover/tooltip:opacity-100">
                  {tooltip}
                </span>
              )}
            </IconContext.Provider>
          )}
        </div>
        {error && (
          <p className="mx-auto mt-1 max-w-[60%] text-xs text-error">{error}</p>
        )}
      </div>
    </IconContext.Provider>
  );
};
