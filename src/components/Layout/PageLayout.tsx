import type { ReactNode } from "react";
import { Header } from "./Header";
import type { User } from "../../types";

type PageLayoutProps = {
  children: ReactNode;
  showAuthLink?: boolean;
  loginHref?: string;
  currentUser?: User | null;
  onLogout?: () => void;
};

export const PageLayout = ({
  children,
  showAuthLink,
  loginHref,
  currentUser,
  onLogout,
}: PageLayoutProps) => (
  <div className="h-screen flex flex-col relative">
    <Header
      showAuthLink={showAuthLink}
      loginHref={loginHref}
      currentUser={currentUser}
      onLogout={onLogout}
    />
    <div className="flex-1 flex justify-center px-6 pb-12 pt-4 grow overflow-scroll">
      <main className="w-full max-w-[780px]">{children}</main>
    </div>
  </div>
);
