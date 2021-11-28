import { ROUTES } from "../constants/routes";
import Link from "next/link";
import React from "react";
import { useAuth } from '../context/AuthUserContext';

import {Button} from 'reactstrap';


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
  let loggedIn= true;
    if(loading ||  authUser) {
      loggedIn = true;
    }
  return (
    <div className="flex items-center my-4 ml-20 space-x-12 text-shadow-gray mr-40">
      <NavLink to={ROUTES.HOME}>
        <img src="logo.png" />
      </NavLink>

      <div className="border-r-2 border-divider-color w-1 h-10"></div>

      <NavLink to={ROUTES.HOME}>Home</NavLink>
      <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
      <NavLink to={ROUTES.CONTACT_US}>Contact Us</NavLink>
      <input
        type="text"
        className="p-3 rounded-lg drop-shadow-md w-96 mr-3 w-10 border-2"
        placeholder="Search for a company"
      />
      <div className="border-r-2 border-divider-color w-6/12 h-10"></div>
      {loggedIn && (
        loading ?
        <div className="order-last">
          <NavLink to={ROUTES.LOG_IN}>
            <button className="bg-login-blue text-white py-2 px-4 rounded-full">Log In</button>
          </NavLink>
          <NavLink to={ROUTES.SIGN_UP}>
            <button className="text-black py-2 px-4 rounded-full ml-0">Sign Up</button>
          </NavLink>
        </div>  :
        <div>
        { authUser && 
          <div>
            <span>Hello  {authUser.email}</span>
            <div className="border-r-2 border-divider-color w-6/12 h-10"></div>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        }
        </div>)}
    </div>
  );
};
