import Navbar from "./components/navbar";
import "./globals.css";
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "Jee Neet Pulse",
  description: "institution for JEE - NEET entrance exams",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      <body className="m-0 p-0 font-geist overflow-x-hidden overflow-y-auto">
        <Navbar />
        {children}
        <Toaster /> 
      </body>
    </html>
  );
}
