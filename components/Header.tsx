import { ROUTES } from "../constants/routes";
import Link from "next/link";
import { MenuIcon } from "@heroicons/react/outline";
import { useAuth } from "../utils/AuthUserContext";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Company } from "../models/interfaces/types/Company";
import AutoComplete from "./AutoComplete";
import router from "next/router";
import Login from "./Login";
import { Modal } from "../components/Modal";
import SignUp from "./SignUp";
import { DropdownDos, Menu, MenuItem } from "./DropdownDos";
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
  const [state, setState] = useState("home");
  function setHomeState() {
    setState("home");
  }
  const MobileNavMenu = (companies) => {
    return (
      <Menu>
        <MenuItem>
          <NavLink to={ROUTES.HOME}>Home</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
        </MenuItem>
        <MenuItem>
          <AutoComplete items={companies} />
        </MenuItem>
        <MenuItem>
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
                    <span className="mr-1 ml-2 min-w-max">
                      Hello {authUser.username}!
                    </span>
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
            <div className="flex flex-col md:flex-row mt-2 order-last">
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
        </MenuItem>
      </Menu>
    );
  };
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
        // console.error(error);
      }
    }
    getCompanies();
  }, []);
  return (
    <div>
      <div className="flex flex-row items-center my-4 ml-0 md:ml-20 space-x-60 md:space-x-12 text-shadow-gray">
        <div className="min-w-100 ml-10 md:ml-0 self-start">
          <NavLink to={ROUTES.HOME}>
            <img src="Logo.svg" />
          </NavLink>
        </div>

        <div className="hidden md:block md:border-r-2 border-divider-color w-1 h-10"></div>
        <div className="hidden md:block  max-w-0 max-h-0 md:max-h-none md:max-w-none">
          <NavLink to={ROUTES.HOME}>Home</NavLink>
        </div>
        <div className="hidden md:block max-w-0 max-h-0 md:max-h-none md:max-w-none md:visible">
          <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
        </div>
        <div className="hidden md:block max-w-0 max-h-0 md:max-h-none md:max-w-none md:visible">
          <NavLink to={ROUTES.CONTACT_US}>Contact Us</NavLink>
        </div>
        <div className="hidden md:block max-w-0 max-h-0 md:max-h-none md:max-w-none md:visible">
          <AutoComplete items={companies} />
        </div>
        <div className=" hidden md:block border-r-2 border-divider-color h-10 max-w-0 max-h-0"></div>
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
                  <span className="mr-1 ml-2 min-w-max">
                    Hello {authUser.username}!
                  </span>
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
          <div className="hidden md:flex md:mt-2">
            <button
              onClick={(e) => setState("login")}
              className="bg-login-blue text-white md:py-2 px-4 rounded-full"
            >
              Log In
            </button>
            <button
              onClick={() => setState("signup")}
              className="text-black md:py-2 px-4 rounded-full ml-0"
            >
              Sign Up
            </button>
          </div>
        )}
        <div className="md:hidden cursor-pointer mt-0">
          <DropdownDos menu={<MobileNavMenu />}>
            <MenuIcon height={40} width={30} />
          </DropdownDos>
        </div>
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
            <Login setHomeState={setHomeState} />
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
            <SignUp setHomeState={setHomeState} />
          </div>
        </Modal>
      )}
    </div>
  );
};
