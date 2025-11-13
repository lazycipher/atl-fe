import { FaRegDotCircle } from "react-icons/fa";

type LogoProps = {
  muted?: boolean;
};

export const Logo = ({ muted = false }: LogoProps) => {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold text-[1.05rem] tracking-[0.01em] ${
        muted ? "text-slate-600" : "text-slate-900"
      }`}
    >
      <FaRegDotCircle size={30} />
      foo-rum
    </span>
  );
};
