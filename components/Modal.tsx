import { useCallback, useEffect } from "react";

export const Modal: React.FC = ({ children }) => (
  <div
    className="flex items-center  h-screen fixed z-50 inset-0 overflow-y-auto bg-overlay-grey bg-opacity-75 justify-center"
    role="dialog"
  >
    <div className="shadow box-border bg-white rounded-md absolute p-8 mx-5">
      <div>{children}</div>
    </div>
  </div>
);
