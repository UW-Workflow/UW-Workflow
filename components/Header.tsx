import { ROUTES } from "../constants/routes";
import Link from "next/link";
import { useAuth } from "../utils/AuthUserContext";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Company } from "../models/interfaces/types/Company";
import AutoComplete from "./AutoComplete";
import { User } from "../models/interfaces/types/User";
import router from "next/router";
import Login from "./Login";
import { Modal } from "../components/Modal";
import SignUp from "./SignUp";
interface NavLinkProps {
  to: string;
}
export const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <Link href={to}>
      <a className="hover:text-light-black hover:font-bold font-medium">
        {children}
      </a>
    </Link>
  );
};

export const Header: React.FC = () => {
  const { authUser, loading, signOut } = useAuth();
  const [dbUsername, setDbUsername] = useState(null);
  const [state, setState] = useState("home");
  async function getUser() {
    try {
      const userResponse = await axios.get("/api/user/getUser", {
        params: {
          email: authUser.email,
        },
      });
      if (userResponse.data.users) {
        setDbUsername(userResponse.data.users[0].username);
        if (userResponse.data.users[0].is_verified != authUser.verified) {
          try {
            const response = await axios.post(`/api/user/updateUserVerified`, {
              email: userResponse.data.users[0].email,
              is_verified: authUser.verified,
            });
            console.log("Updtaed user verified: ", response);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  console.log(authUser, loading);
  if (authUser && !loading && !dbUsername) {
    getUser();
    console.log("DB User: ", dbUsername);
  }

  const onSignOut = (event) => {
    signOut();
    router.push("/");
    event.preventDefault();
  };

  let [companies, setCompanies] = useState<Company[]>([]);
  let [searchedCompanies, setSearchedCompanies] = useState<string[]>([]);
  // fetches the companies on load
  useEffect(() => {
    async function getCompanies() {
      try {
        const response = await axios.get(`/api/company`);
        if (response.data.companies) {
          setCompanies(response.data.companies);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCompanies();
  }, []);
  return (
    <div>
      <div className="flex items-center my-4 ml-20 space-x-12 text-shadow-gray">
        <NavLink to={ROUTES.HOME}>
          <img src="Logo.svg" />
        </NavLink>

        <div className="border-r-2 border-divider-color w-1 h-10"></div>

        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
        <NavLink to={ROUTES.CONTACT_US}>Contact Us</NavLink>
        <AutoComplete items={companies} />
        <div className="border-r-2 border-divider-color max-w-xs h-10"></div>
        {authUser && authUser.verified ? (
          loading ? (
            <span>Loading..</span>
          ) : (
            <div>
              <div className="group inline-block relative">
                <button className="min-w-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="max-w-20 float-left"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {dbUsername ? (
                    <span className="mr-1 ml-2 min-w-max">
                      Hello {dbUsername}!
                    </span>
                  ) : (
                    <span className="mr-1 ml-2 min-w-max">Hello!</span>
                  )}
                  <svg
                    className=" max-h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <ul className="absolute hidden text-gray-700 pt-1 group-hover:block min-w-200">
                  <li className="">
                    <a
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap  min-w-200"
                      href={ROUTES.PROFILE}
                    >
                      Profile
                    </a>
                  </li>
                  <li className="min-w-200">
                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ">
                      <button onClick={onSignOut}>Sign Out</button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )
        ) : (
          <div className="order-last">
            <button
              onClick={(e) => setState("login")}
              className="bg-login-blue text-white py-2 px-4 rounded-full"
            >
              Log In
            </button>
            <button
              onClick={() => setState("signup")}
              className="text-black py-2 px-4 rounded-full ml-0"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      {state === "login" && (
        <Modal>
          <div>
            <div className="min-w-400 max-w-400">
              <button onClick={(e) => setState("home")} className="float-right">
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
            </div>
            <Login />
          </div>
        </Modal>
      )}
      {state === "signup" && (
        <Modal>
          <div>
            <div className="min-w-400">
              <button onClick={(e) => setState("home")} className="float-right">
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
            </div>
            <SignUp />
          </div>
        </Modal>
      )}
    </div>
  );
};
