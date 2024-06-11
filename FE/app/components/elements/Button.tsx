import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded focus:outline-none transition duration-200 ease-in-out relative transform active:scale-95 active:transition active:duration-100",
        {
          "bg-primary text-white shadow-neon-primary hover:shadow-neon-primary-hover hover:bg-primary-100":
            variant === "primary",
          "bg-accent text-white shadow-neon-secondary hover:shadow-neon-secondary-hover hover:bg-accent-100":
            variant === "secondary",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
