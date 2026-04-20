import type { CreateFranchiseePayload, Franchisee } from "../../types/franchisee";

export async function getFranchisees(): Promise<Franchisee[]> {
  // TODO: replace with real API call to fetch franchisees list.
  return [];
}

export async function getFranchiseeById(id: string): Promise<Franchisee | null> {
  // TODO: replace with real API call to fetch a single franchisee by id.
  return null;
}

export async function createFranchisee(
  data: CreateFranchiseePayload,
): Promise<Franchisee> {
  // TODO: replace with real API call to create a franchisee.
  return {
    id: "stub",
    createdAt: new Date().toISOString(),
    ...data,
  } as Franchisee;
}

export async function updateFranchisee(
  id: string,
  data: Partial<Franchisee>,
): Promise<Franchisee> {
  // TODO: replace with real API call to update a franchisee.
  return { id, ...data } as Franchisee;
}

export async function freezeFranchisee(id: string): Promise<void> {
  // TODO: replace with real API call to freeze a franchisee account.
  void id;
}

export async function unfreezeFranchisee(id: string): Promise<void> {
  // TODO: replace with real API call to unfreeze a franchisee account.
  void id;
}

export async function deleteFranchisee(id: string): Promise<void> {
  // TODO: replace with real API call to delete a franchisee account.
  void id;
}

// Backwards-compatible aliases used by existing hooks/components.
export const fetchFranchisees = getFranchisees;
export const fetchFranchiseeById = getFranchiseeById;
