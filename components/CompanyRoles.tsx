import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Role } from "../models/interfaces/types/Role";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router, { useRouter } from "next/router";
import { SORT } from "../constants/sort";
import { responsePathAsArray } from "graphql";
import { FILTER } from "../constants/filter";

export default function CompanyRoles(props) {
  let [roles, setRoles] = useState<Role[]>([]);

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
        let response;
        if (props.sortBy === SORT.SALARY) {
          response = await axios.get(
            `/api/roles/getRoles/getRolesByCompanySalary`,
            {
              params: {
                companyId: props.companyId,
              },
            }
          );
        } else if (props.sortBy === SORT.INTERVIEW) {
          response = await axios.get(
            `/api/roles/getRoles/getRolesByCompanyInterview`,
            {
              params: {
                companyId: props.companyId,
              },
            }
          );
        } else {
          response = await axios.get(
            `/api/roles/getRoles/getRolesByCompanyCoop`,
            {
              params: {
                companyId: props.companyId,
              },
            }
          );
        }
        if (response.data.roles.length > 0) {
          if (props.filterBy === FILTER.SALARY_GREATER_THAN_40) {
            response.data.roles = response.data.roles.filter(
              (r) => r.avg_salary > 40
            );
          }
          if (props.filterBy === FILTER.INTERVIEW_RATING_GREATER_THAN_3) {
            response.data.roles = response.data.roles.filter(
              (r) => r.avg_interview_rating > 3
            );
          }
          if (props.filterBy === FILTER.COOP_RATING_GREATER_THAN_3) {
            response.data.roles = response.data.roles.filter(
              (r) => r.avg_coop_rating > 3
            );
          }
          setRoles(response.data.roles);
        } else setRoles([]);
      } catch (error) {
        toast("Error in getting roles by company for company page. " + error);
      }
    }
    setRoles([]);
    getRoles();
  }, [props.companyId, props.sortBy, props.filterBy]);

  return (
    <div className="flex">
      <div className="flex flex-col flex-grow rounded-lg  my-5 shadow bg-white overflow-scroll max-h-100">
        {roles &&
          roles.map((value, index) => {
            return (
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push({
                    pathname: "/companies/[id]/[role]",
                    query: {
                      id: props.companyId,
                      role: value.id,
                    },
                  });
                }}
                key={index}
              >
                <div className="flex flex-grow flex-row mx-4 py-2">
                  <div className="flex flex-grow my-2 mx-2">
                    <div className="flex flex-col flex-grow justify-center">
                      <div>
                        <p className="text-base font-bold">
                          {value.title_name}
                        </p>
                      </div>
                      <div className="hidden sm:block text-xs pt-2">
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
                                Number(value.avg_interview_rating).toPrecision(
                                  1
                                )
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-row pl-1">--</div>
                          )}
                        </div>

                        {value.avg_salary && (
                          <p>
                            Average Salary:{" $"}
                            {Number(value.avg_salary).toFixed(2)}
                            /hr
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push({
                          pathname: "/companies/[id]/[role]",
                          query: {
                            id: props.companyId,
                            role: value.id,
                          },
                        });
                      }}
                      className="flex items-center ml-auto mr-4 px-5 py-2 mx-2 my-auto border-2 border-blue-active rounded-full text-blue-active"
                    >
                      <span>View</span>
                    </div>
                    {/* <div className="flex items-center my-auto">
                    <img src={"/bookmark_selected.svg"}></img>
                  </div> */}
                  </div>
                </div>
                {index != roles.length - 1 && (
                  <div className="border-b-2 mx-4 flex flex-grow"></div>
                )}
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
