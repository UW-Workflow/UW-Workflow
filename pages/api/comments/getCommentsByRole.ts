import { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "../../../utils/apiResponse";
import { GET_COMMENTS } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method != "GET") {
      return apiResponse(res, 405, "This method is  not supported", true);
    }
    const role_id: Number = Number(req.query.id);
    if (!role_id) {
      return apiResponse(res, 400, " Missing role id", true);
    }
    try {
      const comments = await dbQuery(GET_COMMENTS, {
        role: role_id,
        parent_comment: Number(req.query.parent_comment)
      });
      return res.json(comments);
    } 
  }