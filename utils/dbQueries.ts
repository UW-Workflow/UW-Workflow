import { gql } from "graphql-tag";

export const INSERT_USER = gql`
  mutation INSERT_USER(
    $email: String = ""
    $is_verified: Boolean = false
    $username: String = ""
  ) {
    insert_users(
      objects: { email: $email, is_verified: $is_verified, username: $username }
    ) {
      returning {
        email
        id
        is_verified
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query query_user($email: String) {
    users(where: { email: { _eq: $email } }) {
      email
      is_verified
      username
    }
  }
`;

export const UPDATE_USER_VERIFIED = gql`
  mutation UPDATE_USER_VERIFIED($email: String, $is_verified: Boolean) {
    update_users(
      where: { email: { _eq: $email } }
      _set: { is_verified: $is_verified }
    ) {
      affected_rows
    }
  }
`;

export const GET_COMPANY_NAMES = gql`
  query get_company_names {
    companies {
      id
      name: name
    }
  }
`;

export const INSERT_COMPANY = gql`
  mutation INSERT_COMPANY(
    $name: String
    $website: String
    $city: String
    $country: String
    $description: String
    $logo: String
  ) {
    insert_companies(
      objects: {
        city: $city
        country: $country
        description: $description
        logo: $logo
        name: $name
        website: $website
      }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_REVIEW= gql`
  mutation INSERT_REVIEW(
    $year_worked: Int
    $role_id: Int
    $salary: float8
    $duration: Int
    $interview_experience: String
    $interview_experience_rating: Int
    $work_experience: String
    $work_experience_rating: Int
  ) {
    insert_reviews(
      objects: {
        year_worked: $year_worked
        role_id: $role_id
        salary: $salary
        duration: $duration
        interview_experience: $interview_experience
        interview_experience_rating: $interview_experience_rating
        work_experience: $work_experience
        work_experience_rating: $work_experience_rating
      }
    ) {
      affected_rows
    }
  }
`;

export const QUERY_ROLE = gql`
  query query_role($company_id: Int, $title_name: String) {
    roles(where: { company_id: { _eq: $company_id }, title_name: { _eq:  $title_name} }) {
      id
      title_name
    }
  }
`;

export const INSERT_ROLE = gql`
  mutation INSERT_ROLE(
    $title_name: String
    $company_id: Int
  ) {
    insert_roles(
      objects: {
        title_name: $title_name
        company_id: $company_id
      }
    ) {
      returning {
        id
      }
    }
  }
`;