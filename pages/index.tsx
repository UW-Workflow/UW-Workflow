import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Home from "./home";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title> UW Workflow </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Home />
      <Footer />
    </>
  );
};

export default Index;
