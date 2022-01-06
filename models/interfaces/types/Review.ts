import { Role } from "../types/Role"

export type Review = {
  id: number;
  year_worked: number;
  role: Role;
  salary: number;
  duration: number;
  work_experience: string | null;
  work_experience_rating: number;
  interview_experience: string | null;
  interview_experience_rating: number;
}
  