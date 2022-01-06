import { NextApiRequest, NextApiResponse } from "next";
import { IReviewRequest } from "../../../models/interfaces/IReviewRequest";
import { apiResponse } from "../../../utils/apiResponse";
import { INSERT_REVIEW } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return apiResponse(res, 400, "The given method is not supported", true);
  }
  const review: IReviewRequest = req.body;

  if (!review.year_worked) {
    return apiResponse(res, 400, "Missing year worked", true);
  }
  if (!review.role_id) {
    return apiResponse(res, 400, "Missing role linked to review", true);
  }
  if (!review.salary) {
    return apiResponse(res, 400, "Missing salary", true);
  }
  if (!review.work_experience_rating) {
    return apiResponse(res, 400, "Missing work experience rating", true);
  }
  if (!review.interview_experience_rating) {
    return apiResponse(res, 400, "Missing interview experience rating", true);
  }
  if (!review.duration) {
    return apiResponse(res, 400, "Missing duration", true);
  }

  try {
    const reviewResponse = await dbQuery(INSERT_REVIEW, {
      year_worked: review.year_worked,
      role_id: review.role_id,
      work_experience: review.work_experience,
      work_experience_rating: review.work_experience_rating,
      interview_experience: review.interview_experience,
      interview_experience_rating: review.interview_experience_rating,
      salary: review.salary,
      duration: review.duration,
    });
    return apiResponse(res, 200, `Successfully added review`, true);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Error logging: ${error.message}`, true);
  }
}
