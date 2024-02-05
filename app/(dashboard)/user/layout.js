import { DM_Sans } from "next/font/google";
import "../../globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Protected } from "@/components/Auth/protectedRoute";


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
        {/* <Protected> */}
          <div className="flex overflow-y-hidden max-h-[100vh]">
            <div className="w-[20%] sticky">
              <Sidebar />
            </div>
            <div className="w-full ">
              <div className="">
                <Navbar />
                <div className="px-8 py-6 overflow-y-scroll bg-[#f8f8f8]">
                  {children}
                </div>
              </div>
            </div>
          </div>
        {/* </Protected> */}
      </body>
    </html>
  );
}
