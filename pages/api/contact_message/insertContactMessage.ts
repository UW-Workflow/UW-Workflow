import { NextApiRequest, NextApiResponse } from "next";
import { IContactMessageRequest } from "../../../models/interfaces/IContactMessageRequest";
import { apiResponse } from "../../../utils/apiResponse";
import { INSERT_CONTACT_MESSAGE } from "../../../utils/dbQueries";
import { dbQuery } from "../../../utils/dbQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return apiResponse(res, 400, "The given method is not supported", true);
  }
  const contactMessage: IContactMessageRequest = req.body;


  if (!contactMessage.email) {
    return apiResponse(res, 400, "Missing email", true);
  }
  if (!contactMessage.message) {
    return apiResponse(res, 400, "Missing message", true);
  }

  try {
    const contactMessageResponse = await dbQuery(INSERT_CONTACT_MESSAGE, {
      message: contactMessage.message,
      email: contactMessage.email,
    });
    return res.json(contactMessageResponse.insert_contact_message.returning[0]);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, `Erro logging: ${error.message}`, true);
  }
}
