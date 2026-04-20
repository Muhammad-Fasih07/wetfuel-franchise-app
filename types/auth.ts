import type { Session } from "next-auth";

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  franchiseeId: string;
  role: string;
}

export interface AuthSession extends Session {
  user: AdminUser;
}
