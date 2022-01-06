import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import { QUERY_ROLE } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return apiResponse(res, 405, "This method is  not supported", true);
  }

  const roleTitle: string = String(req.query.title_name);

  if (roleTitle === "") {
    return apiResponse(res, 400, "Missing title of role", true);
  }
  try {
    const roleResponse = await dbQuery(QUERY_ROLE, {
      title_name: roleTitle,
      company_id: req.query.company_id,
    });
    return res.json(roleResponse);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
