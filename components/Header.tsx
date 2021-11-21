import { ROUTES } from "../constants/routes";
import Link from "next/link";
import React from "react";

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
  return (
    <div className="flex items-center my-4 ml-20 space-x-12 text-shadow-gray">
      <NavLink to={ROUTES.HOME}>
        <img src="logo.svg" />
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
    </div>
  );
};
