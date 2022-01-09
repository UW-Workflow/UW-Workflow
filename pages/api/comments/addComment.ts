import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "../../../models/interfaces/types/Comment";
import { apiResponse } from "../../../utils/apiResponse";
import { dbQuery } from "../../../utils/dbQuery";
import { INSERT_COMMENT } from "../../../utils/dbQueries";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return apiResponse(res, 400, "The given method is not supported", true);
  }
  const comment: Comment = req.body;
  if (comment.author == "") {
    return apiResponse(res, 400, "Missing author's username", true);
  }
  try {
    const comments = await dbQuery(INSERT_COMMENT, comment);
    return res.json(comments);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
