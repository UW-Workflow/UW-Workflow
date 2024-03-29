import { ROUTES } from "../constants/routes";
import Link from "next/link";
import { MenuIcon } from "@heroicons/react/outline";
import { useAuth } from "../utils/AuthUserContext";
import * as blockies from "blockies-ts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Company } from "../models/interfaces/types/Company";
import AutoComplete from "./AutoComplete";
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
  const [state, setState] = useState("home");
  const [show, setShow] = useState(false);
  const [svg, setSVG] = useState("");
  function setHomeState() {
    setState("home");
  }
  useEffect(() => {
    // const svg = avatar("your custom seed", { size: 200 });
    // setSVG(svg);
  }, []);
  const Auth = () => {
    {
      if (authUser && authUser.verified && loading) {
        return <span>Loading..</span>;
      } else if (authUser && authUser.verified && !loading) {
        return (
          <div>
            <div className="group inline-block relative justify-self-end sm:mb-0 mb-16">
              <button className="min-w-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center ">
                <img
                  src={blockies.create({ seed: authUser.username }).toDataURL()}
                  className="rounded-xl"
                />
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
                  <a className="rounded-t bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap  min-w-200">
                    <Link href={ROUTES.PROFILE}>Profile</Link>
                  </a>
                </li>
                <li className="rounded-b bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                  <a className="">
                    <button onClick={onSignOut}>Sign Out</button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col lg:flex-row mt-2 order-last">
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
        );
      }
    }
  };
  const MobileNavMenu = (companies) => {
    return (
      <div className="flex flex-col cursor-pointer">
        <div className="self-center">
          <NavLink to={ROUTES.HOME}>Home</NavLink>
        </div>
        <div className="self-center">
          <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
        </div>
        <div className="self-center">
          <NavLink to={ROUTES.CONTACT_US}>Contact Us</NavLink>
        </div>
        <div className="self-center">
          <AutoComplete items={companies.companies} />
        </div>
        <div className="self-center">{Auth()}</div>
      </div>
    );
  };
  const onSignOut = (event) => {
    signOut();
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
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center my-4  ml:10 lg:ml-20   text-shadow-gray">
        <div className="flex justify-between lg:justify-start">
          <div className="self-start pl-5 lg:pl-0 min-w-100">
            <NavLink to={ROUTES.HOME}>
              <img src="/Logo.svg" />
            </NavLink>
          </div>
          <div
            className="flex self-end pr-10 lg:hidden cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <MenuIcon height={40} width={30} />
          </div>
        </div>
        <div className="flex self-center lg:hidden cursor-pointer">
          {show ? <MobileNavMenu companies={companies} /> : null}
        </div>
        <div className="hidden lg:block lg:border-r-2 border-divider-color w-1 h-10"></div>
        <div className="hidden lg:block">
          <NavLink to={ROUTES.HOME}>Home</NavLink>
        </div>
        <div className="hidden lg:block">
          <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
        </div>
        <div className="hidden lg:block">
          <NavLink to={ROUTES.CONTACT_US}>Contact Us</NavLink>
        </div>
        <div className="hidden lg:block">
          <AutoComplete items={companies} />
        </div>
        <div className="hidden lg:block border-r-2 border-divider-color h-10"></div>
        <div className="hidden lg:block mr-10">{Auth()}</div>
      </div>
      {state === "login" && (
        <Modal>
          <div>
            <div>
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
            <div>
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
