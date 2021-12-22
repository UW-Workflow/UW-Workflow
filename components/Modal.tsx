import { useCallback, useEffect } from "react";

export const Modal: React.FC = ({ children }) => (
  <div
    className="w-full items-center fixed z-50 inset-0 overflow-y-auto bg-overlay-grey bg-opacity-75 justify-center"
    role="dialog"
  >
    <div className="left-1/3 top-1/4 items-center shadow box-border bg-white rounded-md absolute p-8 justify-center left-2 top-2">
      {" "}
      <div className="min-w-400">{children}</div>
    </div>
  </div>
);
