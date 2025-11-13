import { Modal } from "../Modal/Modal";
import { AuthForm } from "../AuthForm/AuthForm";

type AuthModalProps = {
  mode: "sign-in" | "sign-up";
  open: boolean;
  onClose: () => void;
  onSignIn: (credentials: { email: string; password: string }) => Promise<void>;
  onSignUp: (credentials: { email: string; password: string }) => Promise<void>;
  onModeChange: (mode: "sign-in" | "sign-up") => void;
};

export const AuthModal = ({
  mode,
  open,
  onClose,
  onSignIn,
  onSignUp,
  onModeChange,
}: AuthModalProps) => {
  const handleSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    if (mode === "sign-in") {
      await onSignIn(credentials);
    } else {
      await onSignUp(credentials);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        onModeChange={onModeChange}
      />
    </Modal>
  );
};
