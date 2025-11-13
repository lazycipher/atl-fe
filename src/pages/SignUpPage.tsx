import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { AuthCard } from "../components/AuthCard/AuthCard";
import { PageLayout } from "../components/Layout/PageLayout";
import { useAuth } from "../hooks/useAuth";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, user, logout } = useAuth();

  const handleSubmit = async (data: { email: string; password: string }) => {
    await signup(data);
    navigate("/", { replace: true });
  };

  return (
    <PageLayout showAuthLink={!user} currentUser={user} onLogout={logout}>
      {!user && (
        <div className="absolute top-6 right-7 text-sm">
          <Link to="/">Back to home</Link>
        </div>
      )}
      <AuthCard>
        <AuthForm mode="sign-up" onSubmit={handleSubmit} />
      </AuthCard>
    </PageLayout>
  );
};
