import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../utils/AuthUserContext";
import { ROUTES } from "../constants/routes";
import { CODES } from "../constants/codes";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signInWithEmailAndPassword, authUser, loading } = useAuth();
  const [state, setState] = useState("login");

  const onSubmit = (event) => {
    setLoginError(null);
    signInWithEmailAndPassword(email, password)
      .then(() => {
        if (!loading && authUser) {
          if (authUser.verified) {
            console.log("Success. Verified user logged in.");
            router.back();
          } else {
            setLoginError("Please verify your email address!");
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.code == CODES.USER_NOT_FOUND) {
          setLoginError(
            "No account with the given credentials is found, please Sign Up!"
          );
        } else if (error.code == CODES.WRONG_PASSWORD) {
          setLoginError("Wrong Password!");
        } else setLoginError(error.message);
      });
  };

  return (
    <div className="min-w-400">
      {state === "login" && (
        <div>
          <h2 className="text-xl font-bold text-center text-black">
            Let&apos;s get you signed in
          </h2>
          <p className="mt-2 text-xs text-gray-600 text-center">
            Please make sure you use your uwaterloo email id to sign up.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            <label className="block">
              <span className="text-black">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                id="loginEmail"
                placeholder="Email"
                className="
                        mt-1
                        block
                        min-w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      "
              />
            </label>
            <label className="block">
              <span className="text-black">Password</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="loginPassword"
                placeholder="Password"
                className="
                        mt-1
                        block
                        min-w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      "
              />
            </label>
            <button onClick={() => setState("resetPassword")}>
              <p className="hover:text-light-black hover:font-bold font-medium text-login-blue ml-2 font-cabinet-grotesk text-sm text-right">
                {" "}
                Forgot Password? Reset
              </p>
            </button>
            <div className="block">
              {loginError && (
                <div className="items-left mt-2">
                  <p className="ml-2 font-cabinet-grotesk text-sm font-semibold text-red-700">
                    {loginError}
                  </p>
                </div>
              )}
              <div className="mt-2">
                <div>
                  <button
                    onClick={onSubmit}
                    className="bg-login-blue text-white py-2 px-4  pl-10 pr-10 rounded-2xl min-w-full"
                  >
                    Log In
                  </button>
                </div>
                <p className="ml-2 font-cabinet-grotesk text-sm text-center self-center">
                  Don&apos;t have an account?
                  <button onClick={() => setState("signup")}>
                    <span className="hover:text-light-black hover:font-bold font-medium text-login-blue">
                      {" "}
                      Sign up
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {state === "signup" && <SignUp />}
      {state === "resetPassword" && <ResetPassword />}
    </div>
  );
};

export default Login;
