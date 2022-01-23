import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../utils/AuthUserContext";
import { validateEmail } from "../utils/authUtils";
import { Modal } from "../components/Modal";
import { MainContainer } from "../components/MainContainer";
import { ROUTES } from "../constants/routes";
import Link from "next/link";

import axios from "axios";
const usernameGen = require("username-gen");

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [termsConditions, setTermsCondition] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { createUserWithEmailAndPassword, sendVerificationEmail } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (!validateEmail(email)) {
      setError("Please sign up with your uwaterloo email");
    } else {
      if (termsConditions == true) {
        if (passwordOne === passwordTwo)
          createUserWithEmailAndPassword(email, passwordOne)
            .then(async (authUser) => {
              const userResponse = await axios.post("/api/user/insertUser", {
                email: email,
                is_verified: false,
                username: usernameGen.generateUsername(8, false),
              });
              sendVerificationEmail()
                .then(() => {
                  router.push("/loggedIn");
                })
                .catch((error) => {
                  setError(error.message);
                  console.log(error.message);
                });
            })
            .catch((error) => {
              // An error occurred. Set error message to be displayed to user
              setError(error.message);
            });
        else setError("Passwords do not match");
      } else {
        setError("You must agree to the terms and conditions");
      }
    }
    event.preventDefault();
  };
  const onClose = (event) => {
    router.push("/");
    event.preventDefault();
  };

  return (
    <MainContainer>
      <Modal>
        <div>
          <div>
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
              Get Started
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
                  id="signUpEmail"
                  placeholder="example@uwaterloo.ca"
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
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Enter a password"
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
                <span className="text-black">Confirm Password</span>
                <input
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Re-enter your password"
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
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="
                          rounded
                          border-gray-300
                          text-indigo-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                        onChange={(event) =>
                          setTermsCondition(event.target.checked)
                        }
                      />
                      <span className="ml-2">
                        By signing up, you agree to our Terms and Conditions
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="block">
                {error && (
                  <div className="items-left mt-2">
                    <p className="ml-2 font-cabinet-grotesk text-sm font-semibold text-red-700">
                      {error}
                    </p>
                  </div>
                )}
                <div className="mt-2">
                  <div>
                    <button
                      onClick={onSubmit}
                      className="bg-login-blue text-white py-2 px-4  pl-10 pr-10 rounded-2xl min-w-full"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="items-center mt-2">
                    <p className="ml-2 font-cabinet-grotesk text-sm text-center self-center">
                      Already have an account?
                      <Link href={ROUTES.LOG_IN}>
                        <span className="hover:text-light-black hover:font-bold font-medium text-login-blue">
                          {" "}
                          Log In
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </MainContainer>
  );
};

export default SignUp;
