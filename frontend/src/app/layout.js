import Navbar from "./components/navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Jee Neet Pulse",
  description: "institution for jee - neet entrance exams,",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0 font-instSansN overflow-x-hidden"  >
      
      <Navbar />
      {children}
      </body>
    </html>
  );
}
