import { MainContainer } from "../../../../components/MainContainer";
import { useEffect, useState } from "react";
import CompanyRoles from "../../../../components/CompanyRoles";
import ReviewDetails from "../../../../components/ReviewDetails";
import { useRouter } from "next/router";
import { Company } from "../../../../models/interfaces/types/Company";
import { Role } from "../../../../models/interfaces/types/Role";
import { ROUTES } from "../../../../constants/routes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Roles() {
  const [chosenWindow, setChosenWindow] = useState("reviews");
  function handleClick(tab) {
    setChosenWindow(tab);
  }
  const router = useRouter();
  const [companyID, setCompanyID] = useState<String>();
  const [roleID, setRoleID] = useState<String>();
  const [reviewID, setReviewID] = useState<String>();
  const [company, setCompany] = useState<Company>();
  const [role, setRole] = useState<Role>();

  useEffect(() => {
    if (router && router.query) {
      setCompanyID(router.query.id as string);
      setRoleID(router.query.role as string);
      setReviewID(router.query.review as string);
    }
    if (!reviewID) {
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
        toast(
          "Error in getting compay for companies/id/role/review page. " + error
        );
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
        toast(
          "Error in getting role for companies/id/role/review page. " + error
        );
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
  }, [companyID, roleID, router]);
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
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </MainContainer>
  );
}
