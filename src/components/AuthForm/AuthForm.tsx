import { type FormEvent, useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../Button/Button";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
  initialEmail?: string;
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onModeChange?: (mode: "sign-in" | "sign-up") => void;
};

export const AuthForm = ({
  mode,
  initialEmail = "",
  onSubmit,
  onModeChange,
}: AuthFormProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignUp = mode === "sign-up";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      const errorMsg = "Please fill in all required fields.";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (isSignUp && password !== repeatPassword) {
      const errorMsg = "Passwords do not match.";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ email: email.trim(), password });
      toast.success(
        isSignUp ? "Account created successfully!" : "Signed in successfully!"
      );
    } catch (submissionError) {
      const errorMsg =
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-6 bg-white rounded-3xl p-10 px-9 pb-8 relative shadow-sm">
        <div className="w-full flex justify-center mb-5">
          <div className="p-3 rounded-full bg-gray-100 flex items-center justify-center">
            <TbLogin2 className="text-gray-700 text-2xl" />
          </div>
        </div>
        <header className="flex flex-col gap-1.5 text-center">
          <p className="text-[1.45rem] font-semibold text-slate-900 m-0">
            {isSignUp ? "Create an account to continue" : "Sign in to continue"}
          </p>
          <p className="m-0 text-[0.95rem] text-slate-500">
            {isSignUp
              ? "Create an account to access all the features on this app"
              : "Sign in to access all the features on this app"}
          </p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.9rem] font-medium text-slate-900">
              Email or username
            </span>
            <input
              className="border border-slate-300/50 rounded-[14px] px-4 py-3.5 text-[0.95rem] bg-slate-50/95 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email or username"
              autoComplete="email"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.9rem] font-medium text-slate-900">
              Password
            </span>
            <input
              type="password"
              className="border border-slate-300/50 rounded-[14px] px-4 py-3.5 text-[0.95rem] bg-slate-50/95 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
          </label>

          {isSignUp && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.9rem] font-medium text-slate-900">
                Repeat password
              </span>
              <input
                type="password"
                className="border border-slate-300/50 rounded-[14px] px-4 py-3.5 text-[0.95rem] bg-slate-50/95 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                placeholder="Enter your password again"
                autoComplete="new-password"
              />
            </label>
          )}

          {error && (
            <span role="alert" className="text-red-500 text-[0.88rem]">
              {error}
            </span>
          )}

          <Button
            type="submit"
            variant="submit"
            disabled={loading}
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </div>
      <p className="text-center text-sm text-slate-600 py-4">
        {isSignUp ? "Already have an account?" : "Do not have an account?"}{" "}
        {onModeChange ? (
          <Button
            type="button"
            variant="link"
            onClick={() => onModeChange(isSignUp ? "sign-in" : "sign-up")}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        ) : (
          <Link
            className="text-indigo-600 font-medium"
            to={isSignUp ? "/sign-in" : "/sign-up"}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        )}
      </p>
    </div>
  );
};
