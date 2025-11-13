import { type ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
};

export const AuthCard = ({ children }: AuthCardProps) => (
  <div className="flex items-center justify-center grow h-full p-8 px-6">
    <div className="w-full max-w-[460px] bg-gray-100 rounded-3xl p-2">
      {children}
    </div>
  </div>
);
