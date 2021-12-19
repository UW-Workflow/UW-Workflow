import { MainContainer } from "../components/MainContainer";
import { useState } from "react";
import CompanyRoles from "../components/CompanyRoles";
import Reviews from "../components/Reviews";
import Comments from "../components/Comments";
export default function Roles() {
  const [chosenWindow, setChosenWindow] = useState("reviews");
  function handleClick(tab) {
    setChosenWindow(tab);
  }
  const [company, setCompany] = useState({
    company_name: "MyCompany",
    logo: "",
    role_name: "Role Name Goes Here!",
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
        <div className="flex flex-row flex-grow mx-20">
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
                <p className="text-lg font-bold">{company.role_name}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-4 my-auto">
            <div className="bg-button-blue text-white rounded-xl flex items-center space-x-2 p-4">
              <div className="bg-white text-button-blue rounded-md">
                <img src="plus.svg"></img>
              </div>
              <span>Add a review</span>
            </div>
          </div>
        </div>
        <div className="mb-4 ml-20">
          <div className="flex">
            <ul className="flex">
              <li
                className={
                  chosenWindow === "reviews"
                    ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                    : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                }
                onClick={() => {
                  handleClick("reviews");
                }}
              >
                <a className="font-medium text-black-500 " href="#">
                  Reviews
                </a>
              </li>
              <li
                className={
                  chosenWindow === "comments"
                    ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                    : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                }
                onClick={() => {
                  handleClick("comments");
                }}
              >
                <a className="font-medium text-black-500 " href="#">
                  Comments
                </a>
              </li>
            </ul>
          </div>
          <hr className="mr-20" />
        </div>
        <div className="mx-20">
            {chosenWindow == "reviews" && <Reviews/>}
            {chosenWindow == "comments" && <Comments/>}
        </div>
      </div>
    </MainContainer>
  );
}
