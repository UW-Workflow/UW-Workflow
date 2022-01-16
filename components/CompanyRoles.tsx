import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Role } from "../models/interfaces/types/Role";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router, { useRouter } from "next/router";

export default function CompanyRoles(props) {
  let [roles, setRoles] = useState<Role[]>([]);
  const [companyRoles, setcompanyRoles] = useState([
    { role_name: "Boeing SDE", reviews: 4 },
    { role_name: "Google SDE", reviews: 4 },
    { role_name: "Boeing SDE", reviews: 4 },
    { role_name: "Facebook SDE", reviews: 4 },
    { role_name: "Boeing SDE", reviews: 4 },
    { role_name: "Tesla SDE", reviews: 4 },
    { role_name: "A Pear SDE", reviews: 4 },
    { role_name: "Watermelon SDE", reviews: 4 },
    { role_name: "Boeing SDE", reviews: 4 },
  ]);

  function setStars(num) {
    const TOTAL_STARS = 5;
    var stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <div>
          <img src="/star.svg"></img>
        </div>
      );
    }
    for (let i = 0; i < TOTAL_STARS - num; i++) {
      stars.push(
        <div>
          <img src="/dullStar.svg"></img>
        </div>
      );
    }
    return stars;
  }
  useEffect(() => {
    async function getRoles() {
      try {
        const response = await axios.get(`/api/roles/getRolesByCompany`, {
          params: {
            companyId: props.companyId,
          },
        });
        if (response.data.roles.length > 0) {
          setRoles(response.data.roles);
        } else setRoles([]);
      } catch (error) {
        toast("Error in getting roles by company for company page. " + error);
      }
    }
    setRoles([]);
    getRoles();
  }, [props.companyId]);

  return (
    <div className="flex">
      <div className="flex flex-col flex-grow rounded-lg  my-5 shadow bg-white overflow-auto max-h-100">
        {roles &&
          roles.map((value, index) => {
            return (
              <div
                key={index}
                className="flex flex-grow flex-row mx-4 mb-4 border-b-2 pb-2"
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

                      <div className="flex flex-row">
                        <div>
                          <p>Average Co-op Rating </p>
                        </div>
                        {value.avg_coop_rating ? (
                          <div className="flex flex-row">
                            {setStars(
                              Number(value.avg_coop_rating).toPrecision(1)
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-row  pl-1">--</div>
                        )}
                      </div>

                      <div className="flex flex-row">
                        <div>
                          <p>Average Interview Rating </p>
                        </div>
                        {value.avg_interview_rating ? (
                          <div className="flex flex-row">
                            {setStars(
                              Number(value.avg_interview_rating).toPrecision(1)
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-row pl-1">--</div>
                        )}
                      </div>

                      {value.avg_salary && (
                        <p>
                          Average Salary: {Number(value.avg_salary).toFixed(2)}
                          /hr
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center ml-auto mr-4 px-5 py-2 mx-2 my-auto border-2 border-blue-active rounded-full text-blue-active">
                    <Link
                      href="/companies/[id]/[role]"
                      as={`/companies/${props.companyId}/${value.id}`}
                    >
                      View
                    </Link>
                  </div>
                  {/* <div className="flex items-center my-auto">
                    <img src={"/bookmark_selected.svg"}></img>
                  </div> */}
                </div>
              </div>
            );
          })}
        {roles.length == 0 && (
          <div className="flex flex-row items-center">
            <p className="text-xs mx-auto my-2 text-gray-300 m-0">
              No reviews yet, add a Review
            </p>
          </div>
        )}
      </div>
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </div>
  );
}
