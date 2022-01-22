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
    $name: String!
    $website: String!
    $city: String!
    $country: String!
    $description: String!
    $logo: String!
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

export const INSERT_REVIEW = gql`
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
      returning {
        id
        role_id
      }
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
      total_reviews
    }
  }
`;

export const QUERY_ROLE = gql`
  query query_role($company_id: Int, $title_name: String) {
    roles(
      where: {
        company_id: { _eq: $company_id }
        title_name: { _eq: $title_name }
      }
    ) {
      id
      title_name
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
      replies_object(order_by: { created_time: asc }) {
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
      company_name
    }
  }
`;

export const INSERT_ROLE = gql`
  mutation INSERT_ROLE($title_name: String, $company_id: Int) {
    insert_roles(
      objects: { title_name: $title_name, company_id: $company_id }
    ) {
      returning {
        id
      }
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
      company_name
      total_reviews
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

export const ADD_BOOKMARK_USER = gql`
  mutation ADD_BOOKMARK_USER($email: String, $role_id: Int) {
    insert_bookmarks(objects: { email: $email, role_id: $role_id }) {
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

export const REMOVE_BOOKMARK_EMAIL = gql`
  mutation REMOVE_BOOKMARK_EMAIL($email: String, $role_id: Int) {
    delete_bookmarks(
      where: { email: { _eq: $email }, _and: { role_id: { _eq: $role_id } } }
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
        company_name
      }
    }
  }
`;

export const GET_BOOKMARKS_EMAIL = gql`
  query GET_BOOKMARKS_EMAIL($role_id: Int) {
    bookmarks(where: { role_id: { _eq: $role_id } }) {
      email
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
