import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import { CHECK_USER_BOOKMARKS } from "../../../utils/dbQueries";
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
    return apiResponse(res, 400, " Missing email id", true);
  }
  if (!role_id) {
    return apiResponse(res, 400, " Missing role id", true);
  }
  try {
    const response = await dbQuery(CHECK_USER_BOOKMARKS, {
      email: email,
      role_id: role_id,
    });
    console.log(response.users.length);
    if (response.users.length > 0) {
      const result = {
        result: true,
      };
      return res.json(result);
    } else {
      const result = {
        result: false,
      };
      return res.json(result);
    }
    // return res.json(users);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
