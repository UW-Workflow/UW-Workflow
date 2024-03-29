import { NextApiRequest, NextApiResponse } from "next";
import { useReducer } from "react-transition-group/node_modules/@types/react";
import { User } from "../../../models/interfaces/types/User";
import { apiResponse } from "../../../utils/apiResponse";
import { QUERY_USER } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }

  const userEmail: string = String(req.query.email);

  if (userEmail === "") {
    return apiResponse(res, 400, "Missing user's email", true);
  }
  try {
    const userResponse = await dbQuery(QUERY_USER, {
      email: userEmail,
    });
    return res.json(userResponse);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
