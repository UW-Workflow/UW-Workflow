import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import { GET_ROLE } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }
  const id: number = Number(req.query.id);
  if (!id) {
    return apiResponse(res, 400, " Missing role id", true);
  }
  try {
    const roles = await dbQuery(GET_ROLE, {
      id: id,
    });
    return res.json(roles);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
