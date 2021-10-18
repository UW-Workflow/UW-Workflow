import Head from "next/head";
import { MainContainer } from "../components/MainContainer";
import React from "react";
import { Header } from "../components/Header";
export default function Home() {
  return (
    <>
      <Head>
        <title> UW Workflow </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainContainer>
        <div className="flex items-center justify-between mx-auto">
          <div className="flex flex-col space-y-4 z-10">
            <div className="self-center bg-gradient-2 filter rounded-full blur-huge h-gradient-2-circle w-gradient-2-circle z-0 -ml-48"></div>
          </div>
          <div className="flex flex-col space-y-4">
            <img src="companies.png" />
          </div>
        </div>
      </MainContainer>
    </>
  );
}
