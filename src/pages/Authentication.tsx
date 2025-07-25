import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

type AuthMode = "login" | "register";

function Authentication() {
  const [mode, setMode] = useState<AuthMode>("login");

  const isLoginMode = mode === "login";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {/* Display title based on value of state `mode` */}
          {isLoginMode ? "login" : "Create an Account"}
        </h1>

        {/* Login form */}
        {isLoginMode && <LoginForm />}

        {/* Register form */}
        {!isLoginMode && <RegisterForm />}

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(isLoginMode ? "register" : "login")}
            className="cursor-pointer text-sm text-blue-600 hover:underline"
          >
            {/* Display text for the button based on value of state `mode` */}
            {isLoginMode
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
