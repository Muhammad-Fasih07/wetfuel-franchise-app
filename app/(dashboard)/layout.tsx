import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: "240px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Topbar />
        <main
          style={{
            flex: 1,
            background:
              "radial-gradient(1200px 600px at 100% 0%, rgba(206,28,26,0.06) 0%, transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(136,123,106,0.09) 0%, transparent 55%), #f7f7f7",
            padding: "32px",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "fixed",
              top: 0,
              left: "240px",
              right: 0,
              height: "100vh",
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px)," +
                "linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </main>
      </div>
    </div>
  );
}
