import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../../utils/apiResponse";
import { GET_ROLES_BY_COMPANY_SORT_COOP_RATING_H_TO_L } from "../../../../utils/dbQueries";
import { dbQuery } from "../../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }
  const companyId: number = Number(req.query.companyId);
  if (!companyId) {
    return apiResponse(res, 400, " Missing company id", true);
  }
  try {
    const roles = await dbQuery(GET_ROLES_BY_COMPANY_SORT_COOP_RATING_H_TO_L, {
      company_id: companyId,
    });
    return res.json(roles);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
