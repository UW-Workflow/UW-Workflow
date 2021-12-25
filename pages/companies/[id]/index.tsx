import { MainContainer } from "../../../components/MainContainer";
import { useEffect, useState } from "react";
import CompanyRoles from "../../../components/CompanyRoles";
import axios from "axios";
import { ROUTES } from "../../../constants/routes";
import { Company } from "../../../models/interfaces/types/Company";
import { useRouter } from "next/router";
export default function Companies() {
  const router = useRouter();
  const companyID = router.query.id;
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    if (!companyID) {
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
  }, [companyID]);

  return (
    <MainContainer>
      {company && (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row flex-grow border-b-2 mx-20">
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
                  <p>
                    {company.city}, {company.country}
                  </p>
                </div>
                <div>
                  <p>{company.description}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-4 my-auto">
              <div className="flex flex-row space-x-1 my-auto">
                {/* <div>
                <img src="star.svg"></img>
              </div> */}

                {/* <div>
                <p className="underline">{company.total_reviews} reviews</p>
              </div> */}
              </div>
              <div className="bg-button-blue text-white rounded-xl flex items-center space-x-2 p-4">
                <div className="bg-white text-button-blue rounded-md">
                  <img src="/plus.svg"></img>
                </div>
                <span>Add a company</span>
              </div>
            </div>
          </div>
          <div className="mx-20">
            <CompanyRoles companyId={companyID} />
          </div>
        </div>
      )}
    </MainContainer>
  );
}
