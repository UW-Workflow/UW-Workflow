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

  if (!user.name) {
    return apiResponse(res, 400, "Missing user's name", true);
  }
  if (!user.password) {
    return apiResponse(res, 400, " Missing user's password", true);
  }
  if (!user.email) {
    return apiResponse(res, 400, "Missing user' email", true);
  }

  try {
    const userResponse = await dbQuery(INSERT_USER, {
      name: user.name,
      password: user.password,
      email: user.email,
    });
    return res.json(userResponse.insert_users.returning[0]);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Erro logging: ${error.message}`, true);
  }
}
