import axios from "axios";
import { useEffect, useState } from "react";
import { Company } from "../models/interfaces/types/Company";

export default function CompanyPage() {
  const [company, setCompany] = useState<Company>();
  useEffect(() => {
    axios.get("/api/company/1").then((res) => {
      setCompany(res.data.companies[0]);
    });
  });
  return company ? (
    <div className="flex">
      <div className="h-40 w-full border-2 border-light-blue-500 mx-2 mt-16">
        <div className="flex">
          <img
            src={company.logo}
            alt="companylogo"
            className="rounded-full h-20 m-4"
          />
          <h1 className="rounded-full m-10 font-normal md:font-bold items-center">
            Company: {company.company_name}
          </h1>
          <h1 className="rounded-full m-10 font-normal md:font-bold items-center">
            Website: <a href={company.website}>{company.website}</a>
          </h1>
          <h1 className="rounded-full m-10 font-normal md:font-bold items-center">
            City: {company.city}
          </h1>
          <h1 className="rounded-full m-10 font-normal md:font-bold items-center">
            Country:{company.country}
          </h1>
          <h1 className="rounded-full m-10 font-normal md:font-bold items-center">
            Rating: {company.rating}/5
          </h1>
        </div>
      </div>
    </div>
  ) : null;
}
