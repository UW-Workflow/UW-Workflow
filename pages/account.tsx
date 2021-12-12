import { MainContainer } from "../components/MainContainer";
import { useState } from "react";
import Profile from "../components/Profile";
import Bookmarks from "../components/Bookmarks";
import Password from "../components/Password";
import { useAuth } from "../context/AuthUserContext";

export default function YourAccount() {
  const [chosenWindow, setChosenWindow] = useState("profile");
  function handleClick(tab) {
    setChosenWindow(tab);
  }
  return (
    <MainContainer>
      <div className="mt-2 pl-20 w-1">
        <div>
          <p className="mb-4 text-lg font-bold">Your Account</p>
        </div>
        <div className="mb-4">
          <div className="flex">
            <ul className="flex">
              <li
                className={
                  chosenWindow === "profile"
                    ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                    : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                }
                onClick={() => {
                  handleClick("profile");
                }}
              >
                <a className="font-medium text-black-500 " href="#">
                  Profile
                </a>
              </li>
              <li
                className={
                  chosenWindow === "bookmarks"
                    ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                    : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                }
                onClick={() => {
                  handleClick("bookmarks");
                }}
              >
                <a className="font-medium text-black-500 " href="#">
                  Bookmarks
                </a>
              </li>
              <li
                className={
                  chosenWindow === "password"
                    ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                    : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                }
                onClick={() => {
                  handleClick("password");
                }}
              >
                <a className="font-medium text-black-500" href="#">
                  Password
                </a>
              </li>
            </ul>
            {/* <div className="bg-logout-bg text-logout-text font-semibold rounded-xl py-2 px-8 flex items-center space-x-2 ml-auto mr-20 mb-4 border-2 border-transparent hover:border-gray-200">
              <img src="Logout.svg"></img>
              <button onClick={signOut}>Log out</button>
            </div> */}
          </div>
          <hr className="mr-20" />
        </div>
      </div>
      {chosenWindow === "profile" && <Profile />}
      {chosenWindow === "bookmarks" && <Bookmarks />}
      {chosenWindow === "password" && <Password />}
    </MainContainer>
  );
}
