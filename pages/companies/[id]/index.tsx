import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompanyLogistics from "../../../components/CompanyLogistics";
import CompanyRoles from "../../../components/CompanyRoles";
import { MainContainer } from "../../../components/MainContainer";
import { FILTER } from "../../../constants/filter";
import { ROUTES } from "../../../constants/routes";
import { SORT } from "../../../constants/sort";
import { Company } from "../../../models/interfaces/types/Company";

export default function Companies() {
  const router = useRouter();
  const [companyID, setcompanyID] = useState<String>();
  //const companyID = router.query.id;
  const [company, setCompany] = useState<Company>();
  const [chosenWindow, setChosenWindow] = useState("roles");
  const [sort, setSort] = useState(SORT.COOP);
  const [filter, setFilter] = useState(null);
  const [showSortBy, setShowSortBy] = useState(false);
  const [showFilterBy, setShowFilterBy] = useState(false);

  useEffect(() => {
    if (router && router.query) {
      setcompanyID(router.query.id as string);
    }
    async function getCompany() {
      try {
        if (!parseInt(companyID as string)) {
          router.push(ROUTES.FOUR_ZERO_FOUR);
        }
        const response = await axios.get(`/api/company/getCompany`, {
          params: {
            id: companyID,
          },
        });
        if (response.data.companies.length > 0 && response.data.companies[0]) {
          setCompany(response.data.companies[0]);
        } else {
          router.push(ROUTES.FOUR_ZERO_FOUR);
        }
      } catch (error) {
        toast("Error in get company for company page. " + error);
      }
    }

    if (companyID) {
      if (
        (company && parseInt(companyID as string) !== company.id) ||
        !company
      ) {
        setCompany(null);
        getCompany();
      }
    }
  }, [companyID, router, sort, filter]);

  return (
    <MainContainer>
      {company && (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row flex-grow mx-5 sm:mx-20">
            <div className="flex flex-col sm:flex-row flex-grow my-2 space-x-4">
              <img
                className="flex ml-5 sm:ml-0 mr-56 sm:mr-0 mt-3 sm:mt-0"
                src={
                  company.logo === "" ? "/default_company.svg" : company.logo
                }
              ></img>
              <div className="flex flex-col mt-2.5 sm:mt-0 ">
                <div className="flex flex-col sm:flex-row">
                  <p className="text-xl font-bold">{company.name}</p>
                  <a
                    href={
                      company.website.indexOf("http://") == 0 ||
                      company.website.indexOf("https://") == 0
                        ? company.website
                        : "https://" + company.website
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 sm:mt-0 sm:ml-2"
                  >
                    🔗 {company.website}
                  </a>
                </div>
                {company.total_reviews != null && (
                  <div className="font-light">
                    <p className="text-sm pt-1">
                      {company.total_reviews} reviews
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-4 sm:my-auto mb-5">
              <div className="flex flex-row space-x-1 my-auto"></div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push({
                    pathname: "/addReview",
                    query: { company_id: company.id },
                  });
                }}
                className="bg-button-blue hover:bg-button-hover text-white rounded-xl flex items-center space-x-2 sm:p-4 px-20 py-4"
              >
                <div className="bg-white text-button-blue rounded-md ">
                  <img src="/plus.svg"></img>
                </div>
                <span>Add a review</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-4  mx-5 lg:mx-20">
            <div className="flex  flex-grow">
              <ul className="flex flex-grow">
                <li
                  className={
                    chosenWindow === "roles"
                      ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                      : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                  }
                  onClick={() => {
                    setChosenWindow("roles");
                  }}
                >
                  <a className="font-medium text-black-500 " href="#">
                    Roles
                  </a>
                </li>
                <li
                  className={
                    chosenWindow === "logistics"
                      ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                      : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                  }
                  onClick={() => {
                    setChosenWindow("logistics");
                  }}
                >
                  <a className="font-medium text-black-500 " href="#">
                    Logistics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="p-2 group relative md:justify-self-end lg:mb-0 inline-block">
                <button
                  onClick={() => {
                    setShowSortBy(false);
                    setSort(SORT.COOP);
                    setFilter(null);
                    setShowFilterBy(false);
                  }}
                  className="text-gray-700 font-semibold py-2 lg:px-4 rounded inline-flex items-center lg:ml-10"
                >
                  <span className="mr-1 ml-2 min-w-max">
                    {"Clear Sort & Filter"}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setShowFilterBy(!showFilterBy);
                    setShowSortBy(false);
                  }}
                  className="text-gray-700 font-semibold py-2 lg:px-4 rounded inline-flex items-center lg:ml-10"
                >
                  <span className="mr-1 ml-2 min-w-max">Filter By</span>
                  <svg
                    className=" max-h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setShowSortBy(!showSortBy);
                    setShowFilterBy(false);
                  }}
                  className="text-gray-700 font-semibold py-2 lg:px-4 rounded inline-flex items-center lg:ml-10"
                >
                  <span className="mr-1 ml-2 min-w-max">Sort By</span>
                  <svg
                    className=" max-h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                {showSortBy ? (
                  <ul className="absolute text-gray-700 pt-1 sm:min-w-100 sm:mr-10 sm:right-0">
                    <li className="rounded-t bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                      <button
                        onClick={() => {
                          setSort(SORT.INTERVIEW);
                          setShowSortBy(false);
                        }}
                      >
                        <a className=" ">Avg Interview rating High to Low</a>
                      </button>
                    </li>
                    <li className="rounded-b bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                      <button
                        onClick={() => {
                          setSort(SORT.COOP);
                          setShowSortBy(false);
                        }}
                      >
                        <a className="">Avg Co-op rating High to Low</a>
                      </button>
                    </li>
                    <li className="rounded-t bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                      <button
                        onClick={() => {
                          setSort(SORT.SALARY);
                          setShowSortBy(false);
                        }}
                      >
                        <a className="">Salary High to Low</a>
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul></ul>
                )}
                {showFilterBy ? (
                  <ul className="absolute text-gray-700 pt-1 sm:min-w-100 sm:mr-2  sm:right-1/3">
                    <li className="rounded-t bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                      <button
                        onClick={() => {
                          setFilter(FILTER.SALARY_GREATER_THAN_40);
                          setShowFilterBy(false);
                        }}
                      >
                        <a className=" ">{"Salary > 40"}</a>
                      </button>
                    </li>
                    <li className="rounded-b bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                      <button
                        onClick={() => {
                          setFilter(FILTER.COOP_RATING_GREATER_THAN_3);
                          setShowFilterBy(false);
                        }}
                      >
                        <a className="">{"Coop Rating > 3"}</a>
                      </button>
                    </li>
                    <li className="rounded-b bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                      <button
                        onClick={() => {
                          setFilter(FILTER.INTERVIEW_RATING_GREATER_THAN_3);
                          setShowFilterBy(false);
                        }}
                      >
                        <a className="">{"Interview Rating > 3"}</a>
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul></ul>
                )}
              </div>
            </div>
          </div>
          <div className="sm:mx-20 mx-5">
            {chosenWindow == "roles" && (
              <CompanyRoles
                companyId={companyID}
                sortBy={sort}
                filterBy={filter}
              />
            )}
            {chosenWindow == "logistics" && (
              <CompanyLogistics companyId={companyID} />
            )}
          </div>
        </div>
      )}
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </MainContainer>
  );
}
