import { MainContainer } from "../../../../components/MainContainer";
import React, { useEffect, useState } from "react";
import Reviews from "../../../../components/Reviews";
import Comments from "../../../../components/Comments";
import { Company } from "../../../../models/interfaces/types/Company";
import { useRouter } from "next/router";
import { ROUTES } from "../../../../constants/routes";
import axios from "axios";
import { Role } from "../../../../models/interfaces/types/Role";
import { useAuth } from "../../../../utils/AuthUserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleLogistics from "../../../../components/RoleLogistics";
import { SORT } from "../../../../constants/sort";

export default function Roles(props) {
  const { authUser, loading } = useAuth();
  const [chosenWindow, setChosenWindow] = useState("reviews");
  function handleClick(tab) {
    setChosenWindow(tab);
  }
  const router = useRouter();
  const [companyID, setCompanyID] = useState<String>();
  const [roleID, setRoleID] = useState<String>();
  const [company, setCompany] = useState<Company>();
  const [role, setRole] = useState<Role>();
  const [bookmarked, setBookmarked] = useState(false);
  const [sort, setSort] = useState(SORT.COOP);
  const [showSortBy, setShowSortBy] = useState(false);

  async function addBookmark() {
    try {
      const response = await axios.get(`/api/roles/addRoleBookmarkByUser`, {
        params: {
          email: authUser.email,
          role_id: roleID,
        },
      });
      if (response.data.update_users.affected_rows == 1) {
        setBookmarked(true);
      }
    } catch (error) {
      toast(
        "Error in adding bookmark for the user for the role page. " + error
      );
    }
  }
  async function removeBookmark() {
    try {
      const response = await axios.get(`/api/roles/removeRoleBookmarkByUser`, {
        params: {
          email: authUser.email,
          role_id: roleID,
        },
      });
      if (response.data.update_users.affected_rows == 1) {
        setBookmarked(false);
      }
      return;
    } catch (error) {
      toast(
        "Error in removing bookmark for the user for the role page. " + error
      );
    }
  }

  const Bookmark = () => {
    return (
      authUser &&
      (bookmarked ? (
        <div>
          <img
            src="/bookmark_selected.svg"
            onClick={removeBookmark}
            className=""
            style={{ cursor: "pointer" }}
          ></img>
        </div>
      ) : (
        <div>
          <img
            src="/bookmark_unselected.svg"
            onClick={addBookmark}
            style={{ cursor: "pointer" }}
            className="flex flex-row flex-grow text-md"
          ></img>
        </div>
      ))
    );
  };

  useEffect(() => {
    if (router && router.query) {
      setCompanyID(router.query.id as string);
      setRoleID(router.query.role as string);
    }
    // if (!companyID || !roleID) {
    //   return;
    // }
    async function getCompany() {
      try {
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
        toast("Error in getting company for the role page. " + error);
      }
    }
    async function getRole() {
      try {
        const response = await axios.get(`/api/roles/getRole`, {
          params: {
            id: roleID,
          },
        });
        if (response.data.roles.length > 0 && response.data.roles[0]) {
          setRole(response.data.roles[0]);
        } else {
          router.push(ROUTES.FOUR_ZERO_FOUR);
        }
      } catch (error) {
        toast("Error in getting role for the role page. " + error);
      }
    }
    async function checkBookmark() {
      try {
        const response = await axios.get(`/api/user/getBookmarkCheck`, {
          params: {
            email: authUser.email,
            role_id: roleID,
          },
        });
        if (response.data.result) {
          setBookmarked(true);
        }
      } catch (error) {
        toast("Error in checking bookmark for role page. " + error);
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

    if (roleID) {
      if ((role && parseInt(roleID as string) !== role.id) || !role) {
        setRole(null);
        getRole();
      }
    }
    if (authUser) {
      checkBookmark();
    }
  }, [companyID, roleID, authUser, bookmarked, router, sort]);
  return (
    <MainContainer>
      {company && role && (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row flex-grow mx-5 sm:mx-20">
            <div className="flex flex-col sm:flex-row flex-grow my-2 space-x-4">
              <img
                className="flex ml-5 sm:ml-0 mr-56 sm:mr-0 mt-3 sm:mt-0"
                src={
                  company.logo === "" ? "/default_company.svg" : company.logo
                }
              ></img>
              <div className="flex flex-row">
                <div className="flex flex-col mt-2.5 sm:mt-0">
                  <div className="flex flex-row space-x-2">
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
                    >
                      🔗 {company.website}
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-lg font-bold text-light-black">
                      {role.title_name}
                    </p>
                  </div>
                  {role.total_reviews != null && (
                    <div>
                      <p className="text-xs pt-1">
                        {role.total_reviews} reviews
                      </p>
                    </div>
                  )}
                </div>
                <div className="sm:hidden flex flex-col mx-5">{Bookmark()}</div>
              </div>
              <div className="hidden sm:block flex flex-col">{Bookmark()}</div>
            </div>
            <div className="flex space-x-4  sm:my-auto my-5 ml-5">
              <div className="flex flex-row space-x-1 my-auto">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "/addReview",
                      query: { company_id: company.id, role_id: role.id },
                    });
                  }}
                  className="bg-button-blue text-white rounded-xl flex items-center space-x-2 sm:p-4 px-20 py-4"
                >
                  <div className="bg-white text-button-blue rounded-md">
                    <img src="/plus.svg"></img>
                  </div>
                  <span>Add a review</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mb-4 mx-10 sm:mx-20 space-x-2">
            <div className="flex-row flex-grow">
              <ul className="flex flex-grow">
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
                  <a
                    className="font-medium text-black-500 hidden sm:block"
                    href="#"
                  >
                    Questions and Answers
                  </a>
                  <a className="font-medium text-black-500 sm:hidden" href="#">
                    Q&amp;A
                  </a>
                </li>
                <li
                  className={
                    chosenWindow === "logistics"
                      ? "p-4 border-b-2 border-transparent border-blue-active text-gray-500"
                      : "p-4 border-b-2 border-transparent hover:border-blue-active hover:text-gray-500"
                  }
                  onClick={() => {
                    handleClick("logistics");
                  }}
                >
                  <a className="font-medium text-black-500 " href="#">
                    Logistics
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex">
              <div>
                <div className="p-2 group inline-block relative justify-self-end sm:mb-0">
                  <button
                    onClick={() => {
                      setShowSortBy(!showSortBy);
                    }}
                    className="text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center sm:ml-10"
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
                    <ul className="absolute text-gray-700 pt-1 sm:min-w-200 mr-10 overflow-auto">
                      <li className="rounded-t bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                        <button
                          onClick={() => {
                            setSort(SORT.INTERVIEW);
                            setShowSortBy(false);
                          }}
                        >
                          <a className=" ">Interview rating: High to Low</a>
                        </button>
                      </li>
                      <li className="rounded-b bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                        <button
                          onClick={() => {
                            setSort(SORT.COOP);
                            setShowSortBy(false);
                          }}
                        >
                          <a className="">Co-op rating: High to Low</a>
                        </button>
                      </li>
                      <li className="rounded-t bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                        <button
                          onClick={() => {
                            setSort(SORT.SALARY);
                            setShowSortBy(false);
                          }}
                        >
                          <a className="">Salary: High to Low</a>
                        </button>
                      </li>
                      <li className="rounded-t bg-gray-200 sm:hover:bg-gray-400 p-4 block whitespace-no-wrap">
                        <button
                          onClick={() => {
                            setSort(SORT.TIME);
                            setShowSortBy(false);
                          }}
                        >
                          <a className="">Time Added: Latest to Oldest</a>
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <ul></ul>
                  )}
                </div>
              </div>
            </div>
            <hr className="mr-20" />
          </div>
          <div className="sm:mx-20 mx-5">
            {chosenWindow == "reviews" && (
              <Reviews companyId={companyID} roleId={roleID} sortBy={sort} />
            )}
            {chosenWindow == "comments" && <Comments roleID={roleID} />}
            {chosenWindow == "logistics" && <RoleLogistics roleID={roleID} />}
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
