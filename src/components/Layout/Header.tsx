import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import type { User } from "../../types";
import { TbLogin2 } from "react-icons/tb";
import { Button } from "../Button/Button";

type HeaderProps = {
  showAuthLink?: boolean;
  loginHref?: string;
  currentUser?: User | null;
  onLogout?: () => void;
};

export const Header = ({
  showAuthLink = true,
  loginHref,
  currentUser,
  onLogout,
}: HeaderProps) => {
  const initials = currentUser?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex items-center justify-between px-7 py-5">
      <Logo />
      {currentUser ? (
        <div className="flex items-center gap-3">
          <span className="w-[38px] h-[38px] rounded-full bg-indigo-700 text-white font-semibold inline-flex items-center justify-center">
            {initials}
          </span>
          <span className="text-[0.95rem] font-semibold text-slate-900">
            {currentUser.name}
          </span>
          <Button
            type="button"
            className="w-auto! h-auto! rounded-full px-3.5 py-1.5 bg-slate-100 text-slate-600 text-[0.85rem] hover:bg-slate-200"
            onClick={onLogout}
          >
            Log out
          </Button>
        </div>
      ) : (
        showAuthLink &&
        loginHref && (
          <Link
            to={loginHref}
            className="text-[0.95rem] font-medium text-slate-900 inline-flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-200 hover:bg-slate-900/5 active:translate-y-px"
          >
            Login
            <TbLogin2 className="text-slate-900 text-xl" />
          </Link>
        )
      )}
    </header>
  );
};
