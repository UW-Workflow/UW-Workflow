import { MainContainer } from "../components/MainContainer";
import React, { useEffect, useState } from "react";
import AutoComplete from "../components/AutoComplete";

import { Company } from "../models/interfaces/types/Company";
import axios from "axios";

export default function Home() {
  let [companies, setCompanies] = useState<Company[]>([]);
  let [searchedCompanies, setSearchedCompanies] = useState<string[]>([]);
  // fetches the companies on load
  useEffect(() => {
    async function getCompanies() {
      try {
        const response = await axios.get(`/api/companies`);
        if (response.data.companies) {
          setCompanies(response.data.companies);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCompanies();
  }, []);

  return (
    <>
      <MainContainer>
        <div className="flex items-center justify-between mx-auto">
          <div className="flex flex-col space-y-4 absolute">
            <div className="self-center bg-gradient-2 filter rounded-full blur-huge h-gradient-2-circle w-gradient-2-circle -ml-48"></div>
          </div>
          <div className="flex flex-col space-y-4 ml-6 z-10">
            <h1 className="text-6xl font-cabinet-grotesk font-extrabold">
              The <span className="text-blue-600"> Secret Sauce </span> <br />
              you need on co-op jobs
            </h1>
            <h2 className="text-light-black text-opacity-80">
              Get reviews, salary insights & interview questions on your
              <br />
              dream co-op today
            </h2>

            <div className="flex items-center space-x-4">
              <AutoComplete items={companies} />
              <span>or</span>
              <div className="bg-button-blue text-white rounded-xl p-3 flex items-center space-x-2">
                <div className="bg-white text-button-blue rounded-md">
                  <img src="plus.svg"></img>
                </div>
                <span>Add a company</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <img src="companies.svg" />
          </div>
        </div>
      </MainContainer>
    </>
  );
}
