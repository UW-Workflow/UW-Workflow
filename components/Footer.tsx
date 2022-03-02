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

export const Footer: React.FC = () => {
  return (
    <div className="flex bg-gray-200 text-gray-500  p-4 justify-around w-screen">
      <NavLink to={ROUTES.PRIVACY_POLICY}>Privacy Policy</NavLink>
      <div>Made with ❤ by UW Workflow</div>
      <div></div>
    </div>
  );
};
