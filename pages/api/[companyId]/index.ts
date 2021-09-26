import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is not supported", true);
  }
  const companyId: number = Number(req.query.companyId);

  try {
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
