import { useState } from "react";
export default function CompanyRoles() {
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

  return (
    <div className="flex">
      <div className="flex flex-col flex-grow rounded-lg  my-5 shadow bg-white overflow-auto max-h-100">
        {companyRoles.map((value, index) => {
          return (
            <div
              key={index}
              className="flex flex-grow flex-row mx-4 my-4 border-b-2"
            >
              <div className="flex flex-grow my-2 mx-2">
                <div className="flex flex-col flex-grow">
                  <div>
                    <p className="text-base font-bold">{value.role_name}</p>
                  </div>
                  <div className="text-sm">
                    {value.reviews != 1 ? (
                      <p>{value.reviews} Reviews</p>
                    ) : (
                      <p>{value.reviews} Review</p>
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
    </div>
  );
}
