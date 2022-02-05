import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../../utils/apiResponse";
import { GET_REVIEWS_BY_ROLES_SORT_TIME_LATEST } from "../../../../utils/dbQueries";
import { dbQuery } from "../../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }
  const roleId: number = Number(req.query.roleId);
  if (!roleId) {
    return apiResponse(res, 400, " Missing role id", true);
  }
  try {
    const reviews = await dbQuery(GET_REVIEWS_BY_ROLES_SORT_TIME_LATEST, {
      role_id: roleId,
    });
    return res.json(reviews);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
