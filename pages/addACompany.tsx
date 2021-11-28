import React from "react";
import { MainContainer } from "../components/MainContainer";

export default function AddACompany() {
  return (
    <MainContainer>
      <div className="flex flex-col items-center justify-center bg-add-a-company-gradient rounded-b-3xl bg-cover m-16 p-16">
        <h1 className="text-5xl font-cabinet-grotesk font-extrabold">
          Add a company
        </h1>
        <h4 className="font-cabinet-grotesk mt-5 text-gray-500 text-lg">
          Please fill out the details below to add the
          <br />
          company
        </h4>
        <div className="flex flex-col w-64 h-full bg-white items-center rounded-xl mt-10">
          <h1 className="text-xl font-cabinet-grotesk mt-5 font-bold">
            Add a company
          </h1>
          <h4 className="font-cabinet-grotesk mt-2 text-gray-500 text-sm mr-10 ml-10">
            Please fill out the details below to add the company
          </h4>
          {/* <div className="mt-10">
            <input
              type="text"
              className="flex  rounded-lg drop-shadow-md pr-20 pl-0 py-2"
              placeholder="Company name"
              autoFocus={false}
            />
            <input
              type="text"
              className="flex  rounded-lg drop-shadow-md pr-20 pl-0 py-2"
              placeholder="Company name"
              autoFocus={false}
            />
            <input
              type="text"
              className="flex  rounded-lg drop-shadow-md pr-20 pl-0 py-2"
              placeholder="Company name"
              autoFocus={false}
            />
          </div> */}
        </div>
      </div>
    </MainContainer>
  );
}
