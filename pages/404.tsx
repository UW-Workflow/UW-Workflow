import { MainContainer } from "../components/MainContainer";
import React from "react";
import { NavLink } from "../components/Footer";
import { ROUTES } from "../constants/routes";
export default function PageNotFound404() {
  return (
    <MainContainer>
      <div className="flex flex-row flex-grow items-center">
        <div className="hidden sm:block">
          <div className="self-center bg-gradient-2 filter rounded-full blur-huge h-gradient-2-circle w-gradient-2-circle -ml-auto"></div>
        </div>
        <div className="flex flex-col flex-grow items-center ml-15 m-10 space-y-4">
          <img src="/yeti.svg" />
          <p className="font-black text-5xl">Oops!</p>
          <p className="w-26 text-lg">
            You were not supposed to see this page...yeti here you are
          </p>
          <NavLink to={ROUTES.HOME}>
            <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2 sm:my-0 my-10">
              <span>Go back to the home page</span>
            </div>
          </NavLink>
        </div>
        <div className="hidden sm:block">
          <div className="self-center bg-gradient-2 filter rounded-full blur-huge h-gradient-2-circle w-gradient-2-circle ml-auto"></div>
        </div>
      </div>
    </MainContainer>
  );
}
