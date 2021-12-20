import { Company } from "./Company";
import { User } from "./User";

export type Review = {
    id: number;
    title_name: string;
    year_worked: number;
    company: Company;
    user: User;
    salary: number;
    interview_experience: string;
    interview_experience_rating: number;
    work_experience: string;
    work_experience_rating: number;
  };
  