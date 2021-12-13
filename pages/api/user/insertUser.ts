import { NextApiRequest, NextApiResponse } from "next";
import { IUserRequest } from "../../../models/interfaces/IUserRequest";
import { apiResponse } from "../../../utils/apiResponse";
import { INSERT_USER } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return apiResponse(res, 400, "The given method is not supported", true);
  }
  const user: IUserRequest = req.body;

  if (!user.email) {
    return apiResponse(res, 400, "Missing user' email", true);
  }
  if (!user.username) {
    return apiResponse(res, 400, "Missing user's username", true);
  }

  try {
    const userResponse = await dbQuery(INSERT_USER, {
      email: user.email,
      is_verified: user.is_verified,
      username: user.username
    });
    return res.json(userResponse.insert_users.returning[0]);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
