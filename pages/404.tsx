import { MainContainer } from "../components/MainContainer";
import React from "react";

export default function PageNotFound404() {
  return (      
    <MainContainer>
    <div className="flex items-center fit-content">
      <div className="flex items-center flex-col">
          <img src="illustration.png" />
          <p className="font-extrabold text-5xl">Oops!</p>
          <p>You weren't supposed to see this page...yeti here you are</p>
          <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2">
            <span>Go back to the home page</span>
          </div>
      </div>
    </div>
    </MainContainer>
  );
}
