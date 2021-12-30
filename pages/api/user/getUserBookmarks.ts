import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import { GET_USER_BOOKMARKS } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }
  const email: string = String(req.query.email);
  if (email === "") {
    return apiResponse(res, 400, " Missing email id", true);
  }
  try {
    const response = await dbQuery(GET_USER_BOOKMARKS, {
      email: email,
    });
    if (response.users.length > 0) {
      const result = {
        bookmarks: response.users[0].roles_bks,
      };
      return res.json(result);
    } else {
      const result = {
        bookmarks: [],
      };
      return res.json(result);
    }
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
