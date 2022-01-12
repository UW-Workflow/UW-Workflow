import axios from "axios";
import { useEffect, useState } from "react";
import { Role } from "../models/interfaces/types/Role";
import { useAuth } from "../utils/AuthUserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Bookmarks() {
  const [companyNames, setCompanyNames] = useState<String[]>([]);
  const { authUser, loading } = useAuth();
  const [bookmarks, setBookmarks] = useState<Role[]>([]);
  const [update, setUpdate] = useState(false);
  // get company name
  async function getCompanyName(companyID: number) {
    try {
      const response = await axios.get(`/api/company/getCompanyName`, {
        params: {
          id: companyID,
        },
      });
      if (response.data.companies.length > 0 && response.data.companies[0]) {
        return response.data.companies[0].name;
      }
      return null;
    } catch (error) {
      toast(
        "Error in getting company name for bookmarks for account page. " + error
      );
    }
  }
  async function removeBookmark(roleID: number) {
    try {
      const response = await axios.get(`/api/roles/removeRoleBookmarkByUser`, {
        params: {
          email: authUser.email,
          role_id: roleID,
        },
      });
      if (response.data.update_users.affected_rows == 1) {
        setUpdate(true);
      }
      return;
    } catch (error) {
      toast("Error in removing bookmark for account pages. " + error);
    }
  }

  useEffect(() => {
    async function getRoles() {
      try {
        const response = await axios.get(`/api/user/getUserBookmarks`, {
          params: {
            email: authUser.email,
          },
        });
        if (response.data.bookmarks.length > 0) {
          setBookmarks(response.data.bookmarks);
        }
      } catch (error) {
        toast("Error in getting bookmarks for account page. " + error);
      }
    }
    getRoles();
  }, [authUser, update]);

  return (
    <div className="flex">
      <div className="self-center bg-gradient-2 filter blur-huge px-20 py-16 mt-5 flex-grow"></div>
      <div className="flex flex-col flex-grow rounded-lg bg-white my-5 shadow bg-white overflow-auto max-h-100">
        {bookmarks &&
          bookmarks.map((value, index) => {
            return (
              <div
                key={index}
                className="flex flex-grow flex-row mx-4 my-4 border-b-2"
              >
                <div className="flex flex-grow my-2 mx-2">
                  <div className="flex flex-col flex-grow">
                    <div>
                      <p className="text-base font-bold">{value.title_name}</p>
                    </div>
                    <div className="text-sm">
                      {/* {value.reviews != 1 ? (
                      <p>{value.reviews} Reviews</p>
                    ) : (
                      <p>{value.reviews} Review</p>
                    )} */}
                      {value.avg_coop_rating && (
                        <p>Average Coop Rating: {value.avg_coop_rating}</p>
                      )}
                      {value.avg_interview_rating && (
                        <p>
                          Average Interview Rating: {value.avg_interview_rating}
                        </p>
                      )}
                      {value.avg_salary && (
                        <p>Average Salary: {value.avg_salary}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center ml-auto mr-4 px-5 py-2 mx-2 my-auto border-2 border-blue-active rounded-full">
                    <p className="text-blue-active">View</p>
                  </div>
                  <div className="flex items-center my-auto">
                    <img src={"bookmark_selected.svg"}></img>
                  </div>
                </div>
              </div>
            );
          })}
        <p className="text-xs mx-auto my-2 text-gray-300">
          You have reached the end of the list
        </p>
      </div>
      <div className="self-center bg-gradient-3 filter blur-huge px-20 py-10 mt-5 flex-grow"></div>
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </div>
  );
}
