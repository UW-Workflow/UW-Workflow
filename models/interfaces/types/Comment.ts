export type Comment = {
  id: number;
  author: string;
  parent_comment: number;
  content: string;
  created_time: string;
  role: number;
};