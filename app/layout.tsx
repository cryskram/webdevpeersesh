import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const montserrat = Montserrat({ subsets: ["latin"], weight: "variable" });

export const metadata: Metadata = {
  title: "Peer Learning",
  description: "Peer learning website for attendance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-bg text-white`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
