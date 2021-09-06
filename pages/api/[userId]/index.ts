import { NextApiRequest, NextApiResponse } from "next";
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

  const userId: number = Number(req.query.userId);
  try {
    const user = await dbQuery(QUERY_USER, {
      id: userId,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
