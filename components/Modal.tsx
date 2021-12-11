import { useCallback, useEffect } from "react";

export const Modal: React.FC = ({ children }) => (


    <div className="w-96 items-center fixed z-10 inset-0 overflow-y-auto bg-overlay-grey bg-opacity-75 justify-center" role="dialog">
      <div className="ml-105 mt-40 items-center shadow box-border bg-white rounded-md absolute p-8 justify-center left-2 top-2"> <div className="min-w-400">{children}</div></div>
    </div>


    
   
  );