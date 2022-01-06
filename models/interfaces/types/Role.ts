import { Company } from "./Company";

export type Role = {
  id: number;
  title_name: string;
  company: Company;
  avg_coop_rating: number;
  avg_interview_rating: number;
  avg_salary: number;
};
