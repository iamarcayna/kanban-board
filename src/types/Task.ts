export interface Task {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
}

export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN PROGRESS",
  DONE: "DONE",
} as const;

export interface FormData {
  name: string;
  description: string;
  status: string;
}
