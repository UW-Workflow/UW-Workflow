import { ROUTES } from "../constants/routes";

import Link from "next/link";

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
        <img src="logo.png" />
      </NavLink>

      <div className="border-r-2 border-divider-color w-1 h-10"></div>

      <NavLink to={ROUTES.HOME}>Home</NavLink>
      <NavLink to={ROUTES.ABOUT_US}>About Us</NavLink>
      <NavLink to={ROUTES.CONTACT_US}>Contact Us</NavLink>
    </div>
  );
};
