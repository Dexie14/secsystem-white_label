"use client";

import { isAuthenticated } from "@/hooks/auth/isAuthenticated";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../Spinner";

import { useToken } from "@/hooks/auth/useToken";

const { token } = useToken();

export const Protected = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!token) {
        router.push("/register");
        return;
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [router, token]);

    // useEffect(() => {
    //   if (!isAuthenticated()) {
    //     router.push("/register");
    //   }
    // }, []);

    if (loading) {
        return <div className="flex justify-center my-40 items-center"> <Spinner /> </div>;
      }

    return token ? children : <div className="flex justify-center my-40 items-center"> <Spinner /> </div>;
};
//   return loading ? <div className="flex justify-center my-40 items-center"> <Spinner /> </div>: isAuthenticated() ? children : <Spinner /> ;
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       if (!isAuthenticated()) {
//         router.push("/register");
//       }
//       setLoading(false);
//     };

//     checkAuthentication();
//   }, [router]);