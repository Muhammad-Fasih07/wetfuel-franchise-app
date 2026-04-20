import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export async function fetchCurrentUser() {
  // TODO: Implement current authenticated admin fetch request.
  throw new Error("TODO: fetchCurrentUser");
}

export async function signIn(payload: { email: string; password: string }) {
  // TODO: Implement authentication request against WetFuel auth service.
  return { success: true, payload };
}

export async function sendResetLink(email: string): Promise<boolean> {
  // TODO: Implement reset password link dispatch.
  return Boolean(email);
}

export async function signInAdmin(email: string, password: string) {
  // TODO: Implement admin sign-in request.
  throw new Error(`TODO: signInAdmin (${email}, ${password.length})`);
}

export async function signOutAdmin() {
  // TODO: Implement admin sign-out request.
  throw new Error("TODO: signOutAdmin");
}

export async function updateProfile(data: Record<string, unknown>) {
  // TODO: replace with real API call to update the admin profile.
  return { success: true, data };
}

export async function updatePassword(
  current: string,
  next: string,
): Promise<void> {
  // TODO: replace with real API call to update the admin password.
  void current;
  void next;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // TODO: Implement credentials authorization.
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
