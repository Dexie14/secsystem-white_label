"use client";
import React, { useEffect, useState } from "react";
import avatar from "@/public/assets/dashboard/avatar.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { toast } from "react-toastify";
import { useGetAdmin } from "@/hooks/useAdminProfile";
import { Spinner } from "./Spinner";

const Navbar = () => {
  const pathname = usePathname();

  const { data: admin, isLoading, isError, refetch } = useGetAdmin();


  useEffect(() => {
    // Check if this is the first time the component is rendered
    const isFirstRender = sessionStorage.getItem('isFirstRender') === null;
  
    if (isFirstRender) {
      // Perform any actions you need to do only on the first render
      console.log('First render. Refreshing the page...');
  
      // Trigger a page refresh
      window.location.reload();
      console.log('Page refreshed');
    }
  
    // Set a flag in sessionStorage to indicate that the page has been refreshed
    sessionStorage.setItem('isFirstRender', 'false');
  }, []);
 

  return (
    <div className="bg-white py-2 px-14">
      <section className="flex justify-end">
        <div className="flex items-center gap-4 cursor-pointer ">
          <div className="cursor-pointer relative ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M20.542 17H22.542V19H2.54199V17H4.54199V10C4.54199 7.87827 5.38485 5.84344 6.88514 4.34315C8.38543 2.84285 10.4203 2 12.542 2C14.6637 2 16.6986 2.84285 18.1988 4.34315C19.6991 5.84344 20.542 7.87827 20.542 10V17ZM18.542 17V10C18.542 8.4087 17.9099 6.88258 16.7846 5.75736C15.6594 4.63214 14.1333 4 12.542 4C10.9507 4 9.42457 4.63214 8.29935 5.75736C7.17413 6.88258 6.54199 8.4087 6.54199 10V17H18.542ZM9.54199 21H15.542V23H9.54199V21Z"
                fill="black"
              />
            </svg>
            <div
              className="absolute top-0 end-0 flex justify-center items-center"
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#EB5757",
                color: "#F2F2F2",
                fontSize: "5px",
              }}
            >
              3
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src={avatar}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col ">
                <p
                  className="text-neutral-900 text-base font-bold tracking-wide"
                  style={{ fontFamily: "DMSans" }}
                >
                  {/* Abayomi O. */}
                  {admin?.name
                    .split(" ")
                    .map((word, index) => (index === 0 ? word : word.charAt(0)))
                    .join(" ")}
                </p>
                <span
                  className="text-primary text-xs tracking-tight"
                  style={{ fontFamily: "DMSans" }}
                >
                  {/* {admin?.role} */}
                  {admin?.role === "superadmin" ? "Super Admin" : "User"}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
