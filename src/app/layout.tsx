import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frog's Little Quest",
  description: "Giúp chú ếch hoàn thành thử thách bên hồ sen.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Frog's Little Quest",
    description: "Giúp chú ếch hoàn thành thử thách bên hồ sen.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chú ếch bắt côn trùng trên hồ sen trong Frog's Little Quest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frog's Little Quest",
    description: "Giúp chú ếch hoàn thành thử thách bên hồ sen.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
