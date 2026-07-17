import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frog's Little Quest",
  description: "Giúp chú ếch hoàn thành thử thách bên hồ sen.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
