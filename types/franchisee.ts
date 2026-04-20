export interface Franchisee {
  id: string;
  businessName: string;
  adminUsername: string;
  phone: string;
  email: string;
  location: string;
  status: "active" | "frozen";
  createdAt: string;
}

export type CreateFranchiseePayload = Omit<Franchisee, "id" | "createdAt">;
