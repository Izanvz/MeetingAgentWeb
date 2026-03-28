import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "MeetingAgent | Tus reuniones → acción en 2 minutos",
  description: "Pipeline de IA 100% local que transcribe tu reunión, extrae action items y genera un report en Markdown. Sin APIs de pago, sin nube. Open source.",
  metadataBase: new URL("https://meetingagent.dev"),
  openGraph: {
    title: "MeetingAgent | Tus reuniones → acción en 2 minutos",
    description: "Pipeline de IA 100% local. Whisper + LangGraph + ChromaDB. $0, open source.",
    type: "website",
    siteName: "MeetingAgent",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MeetingAgent | Tus reuniones → acción en 2 minutos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetingAgent | Tus reuniones → acción en 2 minutos",
    description: "Pipeline de IA 100% local. Whisper + LangGraph. $0, open source.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}>
      <body className="antialiased min-h-screen flex flex-col">
        <AnimatedBackground />
<NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
