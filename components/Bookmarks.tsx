import axios from "axios";
import React, { useEffect, useState } from "react";
import { Role } from "../models/interfaces/types/Role";
import { useAuth } from "../utils/AuthUserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Bookmarks() {
  const { authUser, loading } = useAuth();
  const [bookmarks, setBookmarks] = useState<Role[]>([]);
  const [update, setUpdate] = useState(false);

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
    if (authUser) {
      getRoles();
    }
  }, [authUser, update]);

  return (
    <div className="flex">

      <div className="self-center bg-gradient-2 filter blur-huge px-20 py-16 mt-5 flex-grow hidden sm:block"></div>
      <div className="flex flex-col flex-grow rounded-lg bg-white my-5 shadow bg-white overflow-y-auto max-h-100 mx-16 sm:mx-0">
        {bookmarks &&
          bookmarks.map((value, index) => {
            return (
              <div
                key={index}
                className={index < bookmarks.length - 1 ? "flex flex-grow flex-row mx-4 my-4 border-b-2" : "flex flex-grow flex-row mx-4 my-4"}
              >
                <div className="flex flex-grow my-2 mx-2">
                  <div className="flex flex-col flex-grow">
                    <div>
                      <p className="text-base font-bold">{value.title_name}</p>
                    </div>
                    <div className="text-sm">
                      <p>{value.company_name}</p>
                      <div className="hidden sm:block">
                        {value.avg_coop_rating && (
                          <p>
                            Average Coop Rating:{" "}
                            {Number(value.avg_coop_rating).toFixed(2)}
                          </p>
                        )}
                        {value.avg_interview_rating && (
                          <p>
                            Average Interview Rating:{" "}
                            {Number(value.avg_interview_rating).toFixed(2)}
                          </p>
                        )}
                        {value.avg_salary && (
                          <p>
                            Average Salary: {Number(value.avg_salary).toFixed(2)}
                          </p>
                        )}

                      </div>
                    </div>
                  </div>
                  <div className="flex items-center ml-auto mr-4 px-5 py-2 mx-2 my-auto border-2 border-blue-active rounded-full text-blue-active">
                    <Link
                      href="/companies/[id]/[role]"
                      as={`/companies/${value.company_id}/${value.id}`}
                    >
                      View
                    </Link>
                  </div>
                  <div className="flex items-center my-auto">
                    <img
                      onClick={() => removeBookmark(value.id)}
                      src={"/bookmark_selected.svg"}
                      style={{ cursor: "pointer" }}
                    ></img>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="self-center bg-gradient-3 filter blur-huge px-20 py-10 mt-5 flex-grow hidden sm:block"></div>
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </div>
  );
}
