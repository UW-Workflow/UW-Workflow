import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/interfaces/types/User";
import { apiResponse } from "../../../utils/apiResponse";
import { UPDATE_USER_VERIFIED } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return apiResponse(res, 400, "The given method is not supported", true);
  }
  const userEmail: String = String(req.body.email);
  const userVerified: Boolean = Boolean(req.body.is_verified);

  if (userEmail === "") {
    return apiResponse(res, 400, "Missing user's email", true);
  }

  try {
    const userResponse = await dbQuery(UPDATE_USER_VERIFIED, {
      email: userEmail,
      is_verified: userVerified,
    });
    return res.json(userResponse);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
