import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { MuiProvider } from "../components/providers/MuiProvider";
import { DevAuthCleaner } from "../components/providers/DevAuthCleaner";
import { NavigationLoadingBridge } from "../components/providers/NavigationLoadingBridge";
import { GlobalLoadingOverlay } from "../components/ui/GlobalLoadingOverlay";
import "../styles/globals.css";
import "../styles/tokens.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>
          <GlobalLoadingOverlay />
          <Suspense fallback={null}>
            <NavigationLoadingBridge />
          </Suspense>
          <DevAuthCleaner />
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}
