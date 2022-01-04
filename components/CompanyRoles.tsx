import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Role } from "../models/interfaces/types/Role";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        }
      } catch (error) {
        toast("Error in get roles by company for company page. " + error);
      }
    }
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
                className="flex flex-grow flex-row mx-4 my-4 border-b-2"
              >
                <div className="flex flex-grow my-2 mx-2">
                  <div className="flex flex-col flex-grow">
                    <div>
                      <Link
                        href="/companies/[id]/[role]"
                        as={`/companies/${props.companyId}/${value.id}`}
                      >
                        <p className="text-base font-bold">
                          {value.title_name}
                        </p>
                      </Link>
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
                    <img src={"/bookmark_selected.svg"}></img>
                  </div>
                </div>
              </div>
            );
          })}
        <p className="text-xs mx-auto my-2 text-gray-300">
          You have reached the end of the list
        </p>
      </div>
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </div>
  );
}
