import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../utils/AuthUserContext";
import { Modal } from "../components/Modal";
import { MainContainer } from "../components/MainContainer";
import { ROUTES } from "../constants/routes";
import { CODES } from "../constants/codes";

const ResetPassword = () => {
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { sendPasswordResetEmail } = useAuth();

  const onSubmit = (event) => {
    setResetPasswordError(null);
    sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password Reset Email Sent");
        router.push("/resetPasswordCheckEmail");
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

  const onClose = (event) => {
    router.push("/");
    event.preventDefault();
  };

  return (
    <MainContainer>
      <Modal>
        <div>
          <div className="min-w-400 max-w-400">
            <button onClick={onClose} className="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
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
                    <Link href={ROUTES.LOG_IN}>
                      <span className="hover:text-light-black hover:font-bold font-medium text-login-blue">
                        {" "}
                        Go Back
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </MainContainer>
  );
};

export default ResetPassword;
