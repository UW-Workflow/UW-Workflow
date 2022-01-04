import { MainContainer } from "../../../../components/MainContainer";
import React, { useEffect, useState } from "react";
import CompanyRoles from "../../../../components/CompanyRoles";
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

export default function Roles(props) {
  const { authUser, loading } = useAuth();
  const [chosenWindow, setChosenWindow] = useState("reviews");
  function handleClick(tab) {
    setChosenWindow(tab);
  }
  const router = useRouter();
  const companyID = router.query.id;
  const roleID = router.query.role;
  const [company, setCompany] = useState<Company>();
  const [role, setRole] = useState<Role>();
  const [bookmarked, setBookmarked] = useState(false);
  async function addBookmark() {
    try {
      const response = await axios.get(`/api/roles/addRoleBookmarkByUser`, {
        params: {
          email: authUser.email,
          role_id: roleID,
        },
      });
      if (response.data.update_users.length > 0) {
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
      if (response.data.update_users.length > 0) {
        setBookmarked(false);
      }
      return;
    } catch (error) {
      toast(
        "Error in removing bookmark for the user for the role page. " + error
      );
    }
  }

  useEffect(() => {
    if (!companyID || !roleID) {
      router.push(ROUTES.FOUR_ZERO_FOUR);
      return;
    }
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
    getCompany();
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
    getRole();
    async function checkBookmark() {
      try {
        const response = await axios.get(`/api/user/getBookmarkCheck`, {
          params: {
            email: authUser.email,
            role_id: roleID,
          },
        });
        if (response.data.result != null) {
          setBookmarked(true);
        }
      } catch (error) {
        toast("Error in checking bookmark for role page. " + error);
      }
    }
    if (authUser) {
      checkBookmark();
    }
  }, [companyID, roleID, authUser, bookmarked]);
  return (
    <MainContainer>
      {company && role && (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row flex-grow mx-20">
            <div className="flex flex-row flex-grow my-2 space-x-4">
              <img
                src={
                  company.logo === "" ? "/default_company.svg" : company.logo
                }
              ></img>
              <div className="flex flex-col">
                <div className="flex flex-row space-x-2">
                  <p className="text-xl font-bold">{company.name}</p>
                  <p>🔗 {company.website}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{role.title_name}</p>
                </div>
                {authUser ? (
                  bookmarked ? (
                    <p onClick={removeBookmark} className="text-md">
                      Remove from Bookmarks
                    </p>
                  ) : (
                    <p onClick={addBookmark} className="text-md">
                      Save as Bookmarks
                    </p>
                  )
                ) : (
                  <div>
                    <p className="text-md">Log In for Bookmark</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row space-x-4 my-auto">
              <div className="flex flex-col">
                <div className="bg-button-blue text-white rounded-xl flex items-center space-x-2 p-4">
                  <div className="bg-white text-button-blue rounded-md">
                    <img src="/plus.svg"></img>
                  </div>
                  <span>Add a review</span>
                </div>
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
            {chosenWindow == "reviews" && (
              <Reviews companyId={companyID} roleId={roleID} />
            )}
            {chosenWindow == "comments" && <Comments />}
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
