import { NextApiRequest, NextApiResponse } from "next";
import { IRoleRequest } from "../../../models/interfaces/IRoleRequest";
import { apiResponse } from "../../../utils/apiResponse";
import { INSERT_ROLE } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return apiResponse(res, 400, "The given method is not supported", true);
  }
  const role: IRoleRequest = req.body;

  if (!role.title_name) {
    return apiResponse(res, 400, "Missing role title name", true);
  }
  if (!role.company_id) {
    return apiResponse(res, 400, "Missing company linked to review", true);
  }

  try {
    const roleResponse = await dbQuery(INSERT_ROLE, {
      title_name: role.title_name,
      company_id: role.company_id,
    });
    console.log(roleResponse);
    return res.json(roleResponse.insert_roles.returning[0]);;
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
