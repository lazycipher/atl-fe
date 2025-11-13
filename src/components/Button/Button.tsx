import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "toolbar" | "toolbar-white" | "submit" | "icon" | "link";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const baseStyles = {
  toolbar:
    "inline-flex items-center justify-center w-9 h-9 rounded-xl border-none bg-slate-100 text-slate-600 cursor-pointer transition-all duration-150 hover:bg-slate-200 active:translate-y-px",
  "toolbar-white":
    "inline-flex items-center justify-center w-9 h-9 rounded-xl border-none bg-white shadow-sm text-slate-600 cursor-pointer transition-all duration-150 hover:bg-slate-200 active:translate-y-px",
  submit:
    "border-none rounded-full px-5 py-2.5 font-semibold bg-gradient-to-br from-indigo-500 to-indigo-700 text-white cursor-pointer transition-all duration-150 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none hover:shadow-xl active:translate-y-px disabled:hover:shadow-none",
  icon: "inline-flex items-center justify-center w-10 h-10 rounded-full cursor-pointer border-none bg-transparent text-slate-500 transition-all duration-150 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:translate-y-px",
  link:
    "inline-flex items-center border-none bg-transparent text-indigo-600 font-medium cursor-pointer p-0 transition-colors duration-150 hover:text-indigo-700 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed",
};

export const Button = ({
  variant = "toolbar",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyle = baseStyles[variant];
  const combinedClassName = `${baseStyle} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
