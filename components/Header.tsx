import { ROUTES } from "../constants/routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Company } from "../models/interfaces/types/Company";
import AutoComplete from "./AutoComplete";

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
  let [companies, setCompanies] = useState<Company[]>([]);
  let [searchedCompanies, setSearchedCompanies] = useState<string[]>([]);
  // fetches the companies on load
  useEffect(() => {
    async function getCompanies() {
      try {
        const response = await axios.get(`/api/companies`);
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
    <div className="flex items-center my-4 ml-20 space-x-12 text-shadow-gray">
      <NavLink to={ROUTES.HOME}>
        <img src="logo.png" />
      </NavLink>

      <div className="border-r-2 border-divider-color w-1 h-10"></div>

      <NavLink to={ROUTES.HOME}>Home</NavLink>
      <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
      <NavLink to={ROUTES.CONTACT_US}>Contact Us</NavLink>
      <AutoComplete items={companies} />
    </div>
  );
};
