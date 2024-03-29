import axios from "axios";
import { print } from "graphql";

export async function dbQuery(query: any, variables = {}): Promise<any> {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_HASURA_URL,
      {
        query: print(query),
        variables,
      },
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(`Error making db query: ${error.message}`);
  }
}
