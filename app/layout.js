import { DM_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import QueryProviders from "@/context/query-provider";
import { ThemeProvider } from "@/context/ThemeProvider";

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

const DMSans = DM_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Secsystem App",
  description: "Official Secsystem Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.svg" />
      </head>
      <body className={DMSans.className} style={{ fontFamily: "DMSansMedium" }}>
      <ThemeProvider>
        <QueryProviders>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick={false}
            rtl={false}
            draggable
            pauseOnFocusLoss
            theme="light"
          />
          <Toaster/>
          {children}
        </QueryProviders>
      </ThemeProvider>
      </body>
    </html>
  );
}
