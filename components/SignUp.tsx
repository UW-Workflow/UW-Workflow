import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../utils/AuthUserContext";
import { validateEmail } from "../utils/authUtils";

import axios from "axios";
import Login from "./Login";
import Successful from "./Successful";
const usernameGen = require("username-gen");

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [termsConditions, setTermsCondition] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [state, setState] = useState("signup");

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
              console.log("Success. The user is created in Firebase");
              const userResponse = await axios.post("/api/user/insertUser", {
                email: email,
                is_verified: false,
                username: usernameGen.generateUsername(8, false),
              });
              console.log(userResponse);
              sendVerificationEmail()
                .then(() => {
                  console.log("Email Verification sent!");
                  setState("successful");
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

  return (
    <div className="max-w-400">
      {state === "signup" && (
        <div>
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
                    <button onClick={() => setState("login")}>
                      <span className="hover:text-light-black hover:font-bold font-medium text-login-blue">
                        {" "}
                        Log In
                      </span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {state === "login" && <Login />}
      {state === "successful" && (
        <Successful
          header="Check your mail!"
          message="Thank you for signing up! To start using UWWorkflow, please check your email to verify your email id and then log in again."
        ></Successful>
      )}
    </div>
  );
};

export default SignUp;
