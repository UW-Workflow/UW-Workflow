import { MainContainer } from "../components/MainContainer";
import React, { useEffect, useState } from "react";
import AutoComplete from "../components/AutoComplete";
import Image from "next/image";
import { useRouter } from "next/router";
import { Company } from "../models/interfaces/types/Company";
import axios from "axios";

export default function Home() {
  let [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();
  // fetches the companies on load
  useEffect(() => {
    async function getCompanies() {
      try {
        const response = await axios.get(`/api/company`);
        if (response.data.companies) {
          setCompanies(response.data.companies);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCompanies();
  }, []);

  const addACompany = () => {
    router.push("/addcompany");
  };
  return (
    <>
      <MainContainer>
        <div className="flex flex-col lg:flex-row my-10 md:items-center justify-between mx-10 md:mx-auto">
          <div className="flex md:flex-col space-y-4 absolute">
            <div className="self-center bg-gradient-2 filter rounded-full blur-huge h-gradient-2-circle w-gradient-2-circle -ml-48"></div>
          </div>
          <div className="flex flex-col md:flex-col  space-y-4 mx-auto z-10 ">
            <h1 className="text-5xl md:text-6xl font-cabinet-grotesk font-extrabold ">
              The <span className="text-blue-600"> Secret Sauce </span> <br />
              you need on co-op jobs
            </h1>
            <h2 className="text-light-black text-opacity-80">
              Get reviews, salary insights & interview questions on your
              <br />
              dream co-op today
            </h2>

            <div className="flex flex-col flex-wrap lg:flex-row items-center space-x-0 space-x-4 space-y-1">
              <AutoComplete items={companies} />
              <span>or</span>
              <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2">
                <div className="bg-white text-button-blue rounded-md">
                  <img src="plus.svg" loading="lazy"></img>
                </div>
                <button onClick={addACompany}>Add a company</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <img src="companies.svg" loading="lazy" />
            {/* <Image src="/companies.svg" layout="fill"></Image> */}
          </div>
        </div>
      </MainContainer>
    </>
  );
}
