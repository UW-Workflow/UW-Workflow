import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import { GET_COMPANY_NAME } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }
  const companyId: number = Number(req.query.id);
  if (!companyId) {
    return apiResponse(res, 400, " Missing company id", true);
  }
  try {
    const company = await dbQuery(GET_COMPANY_NAME, {
      id: companyId,
    });
    return res.json(company);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
