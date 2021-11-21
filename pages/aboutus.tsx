import React from "react";
import ImageCard from "../components/ImageCard";
import { MainContainer } from "../components/MainContainer";
import {
  AKSHAYA_GITHIB,
  AKSHAYA_LINKEDIN,
  DHVITI_GITHIB,
  DHVITI_LINKEDIN,
  SNEH_GITHUB,
  SNEH_LINKEDIN,
  TONY_GITHUB,
  TONY_LINKEDIN,
} from "../constants/contants";

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
          <h4 className="flex flex-col font-extralight text-gray-400 mt-7">
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
        <div className="mt-60">
          <img height={300} width={300} src="swiglylines.png" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-cabinet-grotesk font-bold text-5xl">
          Meet our team
        </h1>
        <h4 className="font-cabinet-grotesk font-extralight text-gray-600 text-lg mt-2">
          The dream team that is making your decision to choose the next co-op
          easier
        </h4>
        <div className="flex m-10">
          <ImageCard
            name="Tony Kappen"
            role="Developer"
            image="/images/tony.jpg"
            linkedin={TONY_LINKEDIN}
            github={TONY_GITHUB}
          ></ImageCard>
          <ImageCard
            name="Dhviti Patel"
            role="Developer"
            image="/images/dhviti.jpg"
            linkedin={DHVITI_LINKEDIN}
            github={DHVITI_GITHIB}
          ></ImageCard>
          <ImageCard
            name="Sneh Koul"
            role="Developer"
            image="/images/sneh.jpg"
            linkedin={SNEH_LINKEDIN}
            github={SNEH_GITHUB}
          ></ImageCard>
          <ImageCard
            name="Akshaya Rajgopalan"
            role="Developer"
            image="/images/akshaya.jpg"
            linkedin={AKSHAYA_LINKEDIN}
            github={AKSHAYA_GITHIB}
          ></ImageCard>
        </div>
      </div>
    </MainContainer>
  );
}
