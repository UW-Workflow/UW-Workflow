import { useAuth } from "../utils/AuthUserContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { CODES } from "../constants/codes";
import { ROUTES } from "../constants/routes";
import Link from "next/link";

export default function Password() {
  const { authUser, updatePassword } = useAuth();
  const [newPasswordOne, setNewPasswordOne] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const onSubmit = (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (authUser && newPasswordOne === newPasswordTwo) {
      updatePassword(newPasswordOne)
        .then(() => {
          setPasswordChanged(true);
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          if (error.code == CODES.REQUIRES_LOGIN) {
            setError(
              "This action requires you to be logged in recently. Please Sign out and Log In again"
            );
          } else if (error.code == CODES.WEAK_PASSWORD) {
            setError("Password should be atleast 6 characters long.");
          } else setError(error.message);
        });
    } else setError("Passwords do not match");
    event.preventDefault();
  };
  return (
    <div className="flex">
      <div className="self-center bg-gradient-2 filter blur-huge px-20 py-16 mt-5 flex-grow"></div>
      <div className="flex flex-col flex-grow rounded-lg bg-white my-5 shadow bg-white">
        <div className="flex flex-col flex-grow rounded-lg bg-light-grey m-5">
          <div className="flex flex-col flex-grow m-5">
            {passwordChanged ? (
              <div className="flex flex-grow items-center place-self-center">
                <div className="mt-3 grid grid-cols-1 gap-2 justify-items-center">
                  <img src="/Vector.svg" className="self-center" />
                  <h2 className="text-xl font-bold text-center text-black">
                    Password Changed!
                  </h2>
                  <p className="mt-2 text-xs text-gray-600 text-center">
                    Please sign out and log in again to reaunthenticate
                    yourself.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-grow items-center">
                  <p className="my-4 mx-auto text-base font-bold">
                    Change Password
                  </p>
                </div>
                <p className="ml-2 font-cabinet-grotesk text-sm text-center self-center">
                  This action requires you to be logged in recently,
                  <Link href={ROUTES.LOG_IN}>
                    <span className="hover:text-light-black hover:font-bold font-medium text-login-blue">
                      {" "}
                      Log In Again.
                    </span>
                  </Link>
                </p>
                <p className="my-2 text-gray-700">New Password</p>
                <input
                  type="password"
                  onChange={(event) => setNewPasswordOne(event.target.value)}
                  className="p-2 rounded-lg drop-shadow-md min-w-full"
                ></input>
                <p className="my-2 text-gray-700">Confirm New Password</p>
                <input
                  type="password"
                  onChange={(event) => setNewPasswordTwo(event.target.value)}
                  className="p-2 rounded-lg drop-shadow-md min-w-full"
                ></input>
                {error && (
                  <div className="flex">
                    <p className="ml-2 font-cabinet-grotesk text-sm font-semibold text-red-700">
                      {error}
                    </p>
                  </div>
                )}
                <div className="flex">
                  <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2 mx-auto my-4">
                    <button onClick={onSubmit} className="font-bold">
                      Save Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="self-center bg-gradient-3 filter blur-huge px-20 py-10 mt-5 flex-grow"></div>
    </div>
  );
}
