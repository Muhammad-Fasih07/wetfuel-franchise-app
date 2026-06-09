import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: "var(--sidebar-width)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition: "margin-left var(--transition-base)",
        }}
      >
        <Topbar />
        <BreadcrumbBar />
        <main
          style={{
            flex: 1,
            background: "var(--bg-main)",
            padding: "32px",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
