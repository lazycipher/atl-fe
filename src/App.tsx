import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { FeedPage } from "./pages/FeedPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { AuthModal } from "./components/AuthModal/AuthModal";
import { useAuth } from "./hooks/useAuth";

const AppRoutes = () => {
  const {
    user,
    modalMode,
    login,
    signup,
    logout,
    openModal,
    closeModal,
    setModalMode,
  } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <FeedPage
              currentUser={user}
              onRequireAuth={openModal}
              onLogout={logout}
            />
          }
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>

      {modalMode && (
        <AuthModal
          mode={modalMode}
          open={modalMode !== null}
          onClose={closeModal}
          onSignIn={login}
          onSignUp={signup}
          onModeChange={setModalMode}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
