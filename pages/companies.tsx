import { MainContainer } from "../components/MainContainer";
import { useState } from "react";
import CompanyRoles from "../components/CompanyRoles"
export default function Companies() {
  const [company, setCompany] = useState({
    company_name: "MyCompany",
    logo: "",
    location: "My house,My state,My country",
    link: "www.mycompany.com",
    average_review: 0,
    total_reviews: 0,
    roles: [
      {
        role_name: "",
        total_reviews: 0,
      },
    ],
  });
  return (
    <MainContainer>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row flex-grow border-b-2 mx-20">
          <div className="flex flex-row flex-grow my-2 space-x-4">
            <img
              src={company.logo === "" ? "default_company.svg" : company.logo}
            ></img>
            <div className="flex flex-col">
              <div className="flex flex-row space-x-2">
                <p className="text-xl font-bold">{company.company_name}</p>
                <p>🔗 {company.link}</p>
              </div>
              <div>
                <p>{company.location}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-4 my-auto">
            <div className="flex flex-row space-x-1 my-auto">
              <div>
                <img src="star.svg"></img>
              </div>
              <div>
                <p>{company.average_review} Overall Rating from</p>
              </div>
              <div>
                <p className="underline">{company.total_reviews} reviews</p>
              </div>
            </div>
            <div className="bg-button-blue text-white rounded-xl flex items-center space-x-2 p-4">
              <div className="bg-white text-button-blue rounded-md">
                <img src="plus.svg"></img>
              </div>
              <span>Add a company</span>
            </div>
          </div>
        </div>
        <div className="mx-20">
            <CompanyRoles/>
        </div>
      </div>
    </MainContainer>
  );
}
