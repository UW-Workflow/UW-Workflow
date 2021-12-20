import { gql } from "graphql-tag";

export const INSERT_USER = gql`
  mutation INSERT_USER(
    $email: String = ""
    $is_verified: Boolean = false
    $username: String = ""
  ) {
    insert_users(objects: { email: $email, is_verified: $is_verified, username: $username}) {
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
    users(where: {email: {_eq: "dj6patel@uwaterloo.ca"}}) {
      email
      is_verified
      username
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
    $title_name: String;
    $year_worked: Int;
    $company_id: Int;
    $user_id: Int;
    $salary: Float;
    $interview_experience: String;
    $interview_experience_rating: Int;
    $work_experience: String;
    $work_experience_rating: Int;
  ) {
    insert_review(
      objects: {
        title_name: $title_name;
        year_worked: $year_worked;
        company_id: $company_id;
        user_id: $user_id;
        salary: $salary;
        interview_experience: $interview_experience;
        interview_experience_rating: $interview_experience_rating;
        work_experience: $work_experience;
        work_experience_rating: $work_experience_rating;
      }
    ) {
      affected_rows
    }
  }
`;
