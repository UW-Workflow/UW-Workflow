import React from "react";
import { MainContainer } from "../components/MainContainer";

export default function AboutUs() {
  return (
    <MainContainer>
      <div className="flex items-center justify-between mx-24 rounded-lg bg-about-us-gradient">
        <div className="flex flex-col z-10 mx-10 mt-10">
          <h1 className="text-5xl font-cabinet-grotesk font-extrabold">
            Helping you make
            <br />
            the right choice
          </h1>
          <h4 className="font-cabinet-grotesk mt-5">
            The community driven, UWwork helps you sail through <br /> a sea of
            reviews for multiple companies or list and review <br />a previously
            unlisted company, talk with your peers about their experiences.
            <br /> All in one, making the decision to choose the right co-op 10x
            Easier.
          </h4>
        </div>
        <div className="mr-36 mt-10">
          <img src="aboutus.png" />
        </div>
      </div>
      <div className="flex items-start">
        <div className="my-40">
          <img height={300} width={300} src="/Ellipse.png" />
        </div>
        <div className="my-32 mx-96">
          <h2 className="font-cabinet-grotesk font-normal text-4xl">
            How/Why We Started
            <br />
            <span className=" text-blue-600 font-extrabold my-5">
              This Project
            </span>
          </h2>
          <h4 className="flex flex-col font-extralight text-gray-400 my-7">
            <p>
              We started with the belief that Uwaterloo should have a platform
              where students can talk about their coop experiences easily and
              freely.
            </p>
            <p>
              We wanted to create a sense of community and upliftment at
              Waterloo, So here we are now bringing to you a platform where coop
              students can interact/communicate with each other about their coop
              experiences and help each other grow.
            </p>
            The team @UWwork
          </h4>
        </div>
        <div className="my-60">
          <img height={300} width={300} src="swiglylines.png" />
        </div>
      </div>
    </MainContainer>
  );
}
