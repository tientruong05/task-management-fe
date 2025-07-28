export interface TaskPayload {
  id: number;
  title: string;
  description: string;
  status: "PENDING" | "IN-PROGRESS" | "COMPLETED";
  updatedAt: string;
}
