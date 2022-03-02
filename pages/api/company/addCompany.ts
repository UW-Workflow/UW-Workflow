import { NextApiRequest, NextApiResponse } from "next";
import { Company } from "../../../models/interfaces/types/Company";
import { apiResponse } from "../../../utils/apiResponse";
import { INSERT_COMPANY } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return apiResponse(res, 400, "The given method is not supported", true);
  }
  const company: Company = req.body;

  if (company.name === "") {
    return apiResponse(res, 400, "Missing company's name", true);
  }

  if (company.website === "") {
    return apiResponse(res, 400, " Missing company's website", true);
  }

  try {
    const userResponse = await dbQuery(INSERT_COMPANY, {
      name: company.name,
      website: company.website,
      city: company.city,
      country: company.country,
      description: company.description,
      logo: company.logo,
    });
    if (!userResponse) {
      return res.json({});
    }
    return res.json(userResponse.insert_companies.returning[0]);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
