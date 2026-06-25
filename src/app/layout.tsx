import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto Iara",
  description:
    "Plataforma interativa de monitoramento da qualidade da água em praias, lagoas e rios de Santa Catarina. Alinhada à ODS 6 da ONU.",
  keywords: ["água", "saneamento", "Santa Catarina", "qualidade da água", "ODS 6", "meio ambiente"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
