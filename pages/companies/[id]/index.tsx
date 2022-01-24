import { MainContainer } from "../../../components/MainContainer";
import { useEffect, useState } from "react";
import CompanyRoles from "../../../components/CompanyRoles";
import axios from "axios";
import { ROUTES } from "../../../constants/routes";
import { Company } from "../../../models/interfaces/types/Company";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Companies() {
  const router = useRouter();
  const [companyID, setcompanyID] = useState<String>();
  //const companyID = router.query.id;
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    if (router && router.query) {
      setcompanyID(router.query.id as string);
    }
    // if (!companyID) {
    //   return;
    // }
    console.log("Company ID: ", companyID);
    async function getCompany() {
      try {
        if (!parseInt(companyID as string)) {
          router.push(ROUTES.FOUR_ZERO_FOUR);
        }
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
        toast("Error in get company for company page. " + error);
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
  }, [companyID, router]);

  return (
    <MainContainer>
      {company && (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row flex-grow border-b-2 mx-5 sm:mx-20">
            <div className="flex flex-col sm:flex-row flex-grow my-2 space-x-4">
              <img
                className="flex ml-5 sm:ml-0 mr-56 sm:mr-0 mt-3 sm:mt-0"
                src={
                  company.logo === "" ? "/default_company.svg" : company.logo
                }
              ></img>
              <div className="flex flex-col mt-2.5 sm:mt-0 ">
                <div className="flex flex-col">
                  <p className="text-xl font-bold">{company.name}</p>
                  <a
                    href={
                      company.website.indexOf("http://") == 0 ||
                      company.website.indexOf("https://") == 0
                        ? company.website
                        : "https://" + company.website
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2"
                  >
                    🔗 {company.website}
                  </a>
                </div>
                {company.total_reviews != null && (
                  <div className="font-light">
                    <p className="text-sm pt-1">
                      {company.total_reviews} reviews
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-4 sm:my-auto mb-5">
              <div className="flex flex-row space-x-1 my-auto">
                {/* <div>
                <img src="star.svg"></img>
              </div> */}

                {/* <div>
                <p className="underline">{company.total_reviews} reviews</p>
              </div> */}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push({
                    pathname: "/addReview",
                    query: { company_id: company.id },
                  });
                }}
                className="bg-button-blue text-white rounded-xl flex items-center space-x-2 sm:p-4 px-20 py-4"
              >
                <div className="bg-white text-button-blue rounded-md">
                  <img src="/plus.svg"></img>
                </div>
                <span>Add a review</span>
              </div>
            </div>
          </div>
          <div className="sm:mx-20 mx-5">
            <CompanyRoles companyId={companyID} />
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
