import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEAST MONTANA | Discipline. Force. Constance.",
  description: "Ton tableau de bord personnel de discipline et de transformation sur 365 jours.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
