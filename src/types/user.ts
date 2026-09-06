export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}