import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import {
  GET_BOOKMARKS_EMAIL,
  GET_COMPANY,
  GET_COMPANY_NAMES,
} from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }
  const role_id: number = Number(req.query.role_id);
  if (!role_id) {
    return apiResponse(res, 400, " Missing role id", true);
  }
  try {
    const emailResponse = await dbQuery(GET_BOOKMARKS_EMAIL, {
      role_id: role_id,
    });
    return res.json(emailResponse);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
