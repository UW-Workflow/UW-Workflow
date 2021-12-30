import { MainContainer } from "../../../../components/MainContainer";
import { useEffect, useState } from "react";
import CompanyRoles from "../../../../components/CompanyRoles";
import ReviewDetails from "../../../../components/ReviewDetails";
import { useRouter } from "next/router";
import { Company } from "../../../../models/interfaces/types/Company";
import { Role } from "../../../../models/interfaces/types/Role";
import { ROUTES } from "../../../../constants/routes";
import axios from "axios";
export default function Roles() {
  const [chosenWindow, setChosenWindow] = useState("reviews");
  function handleClick(tab) {
    setChosenWindow(tab);
  }
  const router = useRouter();
  const companyID = router.query.id;
  const roleID = router.query.role;
  const reviewID = router.query.review;
  const [company, setCompany] = useState<Company>();
  const [role, setRole] = useState<Role>();

  useEffect(() => {
    if (!companyID || !roleID || !reviewID) {
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
        if (response.data.companies) {
          setCompany(response.data.companies[0]);
        } else {
          router.push(ROUTES.FOUR_ZERO_FOUR);
        }
      } catch (error) {
        console.error(error);
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
        if (response.data.roles) {
          setRole(response.data.roles[0]);
        } else {
          router.push(ROUTES.FOUR_ZERO_FOUR);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getRole();
  }, [companyID, roleID]);
  return (
    <MainContainer>
      {company && role && (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row flex-grow mx-20">
            <div className="flex flex-row flex-grow my-2 space-x-4">
              <img
                src={company.logo === "" ? "default_company.svg" : company.logo}
              ></img>
              <div className="flex flex-col">
                <div className="flex flex-row space-x-2">
                  <p className="text-xl font-bold">{company.name}</p>
                  <p>🔗 {company.website}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{role.title_name}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-4 my-auto">
              <div className="bg-button-blue text-white rounded-xl flex items-center space-x-2 p-4">
                <div className="bg-white text-button-blue rounded-md">
                  <img src="/plus.svg"></img>
                </div>
                <span>Add a review</span>
              </div>
            </div>
          </div>

          <div className="mx-20">
            <ReviewDetails
              companyId={companyID}
              roleId={roleID}
              reviewId={reviewID}
            />
          </div>
        </div>
      )}
    </MainContainer>
  );
}
