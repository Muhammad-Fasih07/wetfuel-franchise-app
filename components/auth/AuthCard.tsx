import type { PropsWithChildren } from "react";

interface AuthCardProps extends PropsWithChildren {
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-[440px] rounded-xl border border-[#e5e5e5] bg-brand-white p-10 shadow-sm ${className}`.trim()}
    >
      {children}
    </div>
  );
}
