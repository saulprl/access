import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  ReactNode,
  useState,
} from "react";

import { IconContext } from "react-icons";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  icon: ReactNode;
  error?: string;
}

export const Input: FC<Props> = ({
  label,
  value,
  icon,
  placeholder,
  error,
  type = "text",
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <IconContext.Provider
      value={{
        size: "24px",
        color: isFocused ? "#7145d6" : "#172A53",
        style: { transition: "color", transitionDuration: "200ms" },
      }}
    >
      <div>
        <div
          className="relative flex flex-row items-center rounded-full border border-slate-900 p-3 pl-12 transition-colors duration-200"
          style={{ borderColor: isFocused ? "#7145d6" : "#172A53" }}
        >
          <span className="absolute left-3">{icon}</span>
          <input
            id={label}
            className="peer appearance-none bg-transparent placeholder-slate-400 placeholder-opacity-0 outline-none focus:placeholder-opacity-100"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type={type}
          />
          <label
            htmlFor={label}
            className="absolute left-10 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-slate-100 px-2 text-slate-900 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-primary-700 "
          >
            {label}
          </label>
        </div>
        {error && (
          <p className="mx-4 ml-10 mt-px text-xs text-error">{error}</p>
        )}
      </div>
    </IconContext.Provider>
  );
};
