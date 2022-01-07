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

export const GET_COMPANY = gql`
  query get_company($id: Int) {
    companies(where: { id: { _eq: $id } }) {
      id
      website
      description
      name
      city
      country
      logo
    }
  }
`;

export const GET_COMMENTS = gql`
  query get_comments($role: Int, $parent_comment: Int) {
    comments(
      where: { role: { _eq: $role }, parent_comment: { _eq: $parent_comment } }
      order_by: { created_time: desc }
    ) {
      id
      content
      parent_comment
      created_time
      replies_object(order_by: { created_time: desc }) {
        id
        content
        created_time
        author_object {
          username
        }
      }
      author_object {
        username
      }
    }
  }
`;
export const INSERT_COMMENT = gql`
  mutation INSERT_COMMENT(
    $author: String
    $content: String
    $parent_comment: Int
    $role: Int
  ) {
    insert_comments(
      objects: {
        author: $author
        content: $content
        parent_comment: $parent_comment
        role: $role
      }
    ) {
      affected_rows
    }
  }
`;
export const GET_COMPANY_NAME = gql`
  query get_company_name($id: Int) {
    companies(where: { id: { _eq: $id } }) {
      name
    }
  }
`;

export const GET_ROLES_BY_COMPANY = gql`
  query get_roles_by_company($company_id: Int) {
    roles(where: { company_id: { _eq: $company_id } }) {
      id
      title_name
      company_id
      avg_coop_rating
      avg_interview_rating
      avg_salary
    }
  }
`;

export const GET_ROLE = gql`
  query get_role($id: Int) {
    roles(where: { id: { _eq: $id } }) {
      id
      title_name
      company_id
      avg_coop_rating
      avg_interview_rating
      avg_salary
    }
  }
`;

export const GET_REVIEWS_BY_ROLES = gql`
  query get_reviews_by_roles($role_id: Int) {
    reviews(where: { role_id: { _eq: $role_id } }) {
      id
      year_worked
      salary
      work_experience
      work_experience_rating
      interview_experience
      interview_experience_rating
      user_id
      duration
      role_id
    }
  }
`;

export const GET_REVIEW = gql`
  query get_review($id: Int) {
    reviews(where: { id: { _eq: $id } }) {
      id
      year_worked
      salary
      work_experience
      work_experience_rating
      interview_experience
      interview_experience_rating
      user_id
      duration
      role_id
    }
  }
`;

export const ADD_USER_BOOKMARK = gql`
  mutation add_user_bookmark($email: String, $role_id: jsonb) {
    update_users(
      where: { email: { _eq: $email } }
      _append: { role_bookmarks: $role_id }
    ) {
      affected_rows
    }
  }
`;

export const REMOVE_USER_BOOKMARK = gql`
  mutation remove_user_bookmark($email: String, $role_id: String) {
    update_users(
      where: { email: { _eq: $email } }
      _delete_key: { role_bookmarks: $role_id }
    ) {
      affected_rows
    }
  }
`;

export const GET_USER_BOOKMARKS = gql`
  query get_user_bookmarks($email: String) {
    users(where: { email: { _eq: $email } }) {
      roles_bks {
        id
        title_name
        company_id
        avg_coop_rating
        avg_interview_rating
        avg_salary
      }
    }
  }
`;

export const CHECK_USER_BOOKMARKS = gql`
  query get_user_bookmarks($email: String, $role_id: jsonb) {
    users(
      where: {
        email: { _eq: $email }
        _and: { role_bookmarks: { _contains: $role_id } }
      }
    ) {
      id
    }
  }
`;
