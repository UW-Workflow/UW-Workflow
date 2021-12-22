import { MouseEventHandler, useState } from "react";

interface Props {
  menu: React.ReactElement;
}

interface MenuItemProps {
  onClick?: MouseEventHandler;
}

export const Menu: React.FC = ({ children }) => (
  <div role="none">{children}</div>
);

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => (
  <div
    className="text-center text-black focus:outline-none cursor-pointer bg-gray-50"
    onClick={onClick}
  >
    {children}
  </div>
);

export const DropdownDos: React.FC<Props> = ({ children, menu }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="left-0 rounded-md "
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      {show ? (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {menu}
        </div>
      ) : null}
    </div>
  );
};
