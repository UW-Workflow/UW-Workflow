import { NextApiRequest, NextApiResponse } from "next";
import { Company } from "../../../../models/interfaces/types/Company";
import { apiResponse } from "../../../../utils/apiResponse";
import {
  GET_COMPANY_NAMES,
  GET_COMPANY_WITH_ID,
} from "../../../../utils/dbQueries";
import { dbQuery } from "../../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is not supported", true);
  }
  const companyId: number = Number(req.query.companyId);

  try {
    const company: Company = await dbQuery(GET_COMPANY_WITH_ID, {
      id: companyId,
    });

    return res.json(company);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
