import { MainContainer } from "../components/MainContainer";
import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function PageNotFound404() {
  return (      
    <MainContainer>
      <div className="grid grid-cols-3 gap-2 place-content-center">
          <div></div>
          <div>
              <div>

              </div>
              <img src="illustration.png" />
              <h2>Oops!</h2>
              <p>You weren't supposed to see this page...yeti here you are</p>
              <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2">
                  <span>Go back to the home page</span>
              </div>
          </div>
          <div></div>
      </div>
    </MainContainer>
  );
}
