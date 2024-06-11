import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary";
  inputSize?: "medium" | "large";
}

const Input: React.FC<InputProps> = ({
  variant = "primary",
  inputSize = "medium",
  className,
  ...props
}) => {
  return (
    <input
      className={clsx(
        "rounded focus:outline-none transition duration-200 ease-in-out",
        {
          "bg-bg-200 text-text border border-primary  focus:ring":
            variant === "primary",
          "bg-bg-200 text-text border border-accent  focus:ring":
            variant === "secondary",
          "px-4 py-2 text-base": inputSize === "medium",
          "px-6 py-3 text-lg": inputSize === "large",
        },
        className
      )}
      {...props}
    />
  );
};

export default Input;
