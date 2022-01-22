import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import { ADD_BOOKMARK_USER, ADD_USER_BOOKMARK } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }
  const email: string = String(req.query.email);
  const role_id: string = String(req.query.role_id);
  if (email === "") {
    return apiResponse(res, 400, " Missing email", true);
  }
  if (!role_id) {
    return apiResponse(res, 400, " Missing role id", true);
  }
  try {
    const roles = await dbQuery(ADD_USER_BOOKMARK, {
      email: email,
      role_id: role_id,
    });
    await dbQuery(ADD_BOOKMARK_USER, {
      email: email,
      role_id: role_id,
    });
    return res.json(roles);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
