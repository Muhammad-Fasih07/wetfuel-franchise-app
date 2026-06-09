import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-main)",
        padding: "24px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "440px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "8px",
          padding: "40px 36px 32px",
        }}
      >
        {children}
      </div>
    </main>
  );
}
