import { gql } from "graphql-tag";

export const INSERT_USER = gql`
  mutation INSERT_USER(
    $email: String = ""
    $name: String = ""
    $password: String = ""
  ) {
    insert_users(objects: { email: $email, name: $name, password: $password }) {
      returning {
        email
        id
        name
        password
      }
    }
  }
`;

export const QUERY_USER = gql`
  query query_user($id: Int) {
    users(where: { id: { _eq: $id } }) {
      email
      id
      name
      password
    }
  }
`;

export const GET_COMPANY_NAMES = gql`
  query get_company_names {
    companies {
      id
      name: company_name
      website
    }
  }
`;

export const GET_COMPANY_WITH_ID = gql`
  query get_company_with_id($id: Int) {
    companies(where: { id: { _eq: $id } }) {
      city
      company_name
      country
      id
      logo
      rating
      website
    }
  }
`;
