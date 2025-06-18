import Navbar from "./components/navbar";
import "./globals.css";
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Jee Neet Pulse",
  description: "institution for JEE - NEET entrance exams,",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0 font-instSansN overflow-x-hidden overflow-y-auto"  >
      
      <Navbar />
      
      {children}
              <Analytics />

      <Toaster /> 
      </body>
    </html>
  );
}
