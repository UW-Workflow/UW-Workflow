import { MainContainer } from "../components/MainContainer";
import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function PageNotFound404() {
  return (      
    <MainContainer>
      <div className="grid grid-cols-3 gap-2 place-content-center">
          <div></div>
          <img src="illustration.png" />
          <div></div>
      </div>
    </MainContainer>
  );
}
