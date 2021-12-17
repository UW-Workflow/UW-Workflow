import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../utils/AuthUserContext";
import { CODES } from "../constants/codes";
import Login from "./Login";
import Successful from "./Successful";

const ResetPassword = () => {
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("resetPassword");
  const router = useRouter();
  const { sendPasswordResetEmail } = useAuth();

  const onSubmit = (event) => {
    setResetPasswordError(null);
    sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password Reset Email Sent");
        setState("successful");
        event.preventDefault();
      })
      .catch((error) => {
        console.log(error.message);
        if (error.code == CODES.USER_NOT_FOUND) {
          setResetPasswordError(
            "No account with the given credentials is found, please Sign Up!"
          );
        }
      });
  };

  return (
    <div className="min-w-400 max-w-400">
      {state === "resetPassword" && (
        <div>
          <h2 className="text-xl font-bold text-center text-black">
            Reset Password
          </h2>
          <p className="mt-2 text-xs text-gray-600 text-center">
            Enter the email address associated with your account to reset your
            password
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
            <div className="block">
              <div className="mt-2">
                <div>
                  <button
                    onClick={onSubmit}
                    className="bg-login-blue text-white py-2 px-4  pl-10 pr-10 rounded-2xl min-w-full"
                  >
                    Submit
                  </button>
                </div>
                {resetPasswordError && (
                  <div className="items-left mt-2">
                    <p className="ml-2 font-cabinet-grotesk text-sm font-semibold text-red-700">
                      {resetPasswordError}
                    </p>
                  </div>
                )}
                <p className="ml-2 font-cabinet-grotesk text-sm text-center self-center">
                  Remembered your password?
                  <button onClick={() => setState("login")}>
                    <span className="hover:text-light-black hover:font-bold font-medium text-login-blue">
                      {" "}
                      Go Back
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {state === "login" && <Login />}
      {state === "successful" && (
        <Successful
          header="Check your mail!"
          message="Email with instructions to reset your password sent successfully.Please check your spam account in case you don't see the account recovery email."
        />
      )}
    </div>
  );
};

export default ResetPassword;
