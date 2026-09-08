import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/components/SessionProvider";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartDrop",
  description: "Share your files with ease and security using SmartDrop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <main className="relative z-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthSessionProvider>
          <NavBar/>
            {children}
            <Toaster position="top-right" richColors />
          </AuthSessionProvider>
        <Footer/>
        </main>
      </body>
    </html>
  );
}
