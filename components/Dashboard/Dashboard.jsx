"use client";

import { useEffect, useState } from "react";

import ReactModal from "react-modal";
import UserInvite from "../Terminal/UserInvite";
import Table from "./Table";
import { useGetDash } from "@/hooks/useGetDash";
import Link from "next/link";

import { useGetAdmin } from "@/hooks/useAdminProfile";

import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { toast } from "react-toastify";
const { token } = useToken();

const Dashboard = () => {
  const { data: dashn, isLoading, isError } = useGetDash();

  console.log(dashn , "dashn")


  const [isOpen, setIsOpen] = useState(false);
  const [dashload, setDashload] = useState("");

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      opacity: "10",
    },
    content: {
      height: "65vh",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto",
      borderRadius: "30px",
      width: "50%",
    },
  };

  const { data: admin } = useGetAdmin();


  //  const getDash = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/admin/dashboard`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response?.data?.status === "success") {
  //       setDashload(response?.data?.data)
  //       return response?.data?.data;
  //     } else {
  //       throw new Error(response.data?.data?.message);
  //     }
      
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       throw new Error(error?.response?.data?.error?.message);
  //     } else if (error instanceof Error) {
  //       throw error;
  //     } else throw new Error("Error occurred");
  //   }
  // };

  // useEffect(() => {
  //   getDash();
  // }, []);
  
  return (
    <div>
      <section className="flex justify-between">
        <h1 className="text-2xl text-dark" style={{ fontFamily: "DMSans" }}>
          Dashboard Overview
        </h1>
        {admin?.role === "superadmin" && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 py-2 px-3 w-1/6 bg-primary text-white rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_1_1079)">
                <path
                  d="M1.60252 7.80845C1.17752 7.63761 1.18252 7.38345 1.63085 7.23428L17.5358 1.93261C17.9767 1.78595 18.2292 2.03262 18.1059 2.46428L13.5608 18.3693C13.4358 18.8101 13.165 18.8301 12.9633 18.4276L9.16668 10.8334L1.60252 7.80845ZM5.67752 7.64178L10.3742 9.52095L12.9075 14.5893L15.8625 4.24762L5.67668 7.64178H5.67752Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1079">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Invite Users
          </button>
        )}
      </section>
      <section className=" ">
        <section className="flex gap-5 mt-5">
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm font-semibold">Total Terminal</p>
            <h5 className="text-primary text-xl mb-3">
              {/* {dashn?.terminals || "0"} */}
              {isLoading ? "00" : dashn?.terminals || 0 }
            </h5>
          </div>
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm font-semibold">Total Transaction </p>
            <h5 className="text-primary text-xl mb-3">
              {/* {dashn?.transactions || "0"} */}
              {isLoading ? "00" : dashn?.transactions || "0"}
            </h5>
          </div>
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm  font-semibold">Total User </p>
            <h5 className="text-primary text-xl mb-3">{isLoading ? "00" : dashn?.users || "0"}</h5>
          </div>
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm font-semibold">
              Total Transaction Amount/Day{" "}
            </p>
            <h5 className="text-primary text-xl mb-3">
              {" "}
              ₦
              {isLoading ? "00" : dashn?.transactionAmountForTheDay?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || " 0.00"}
            </h5>
          </div>
        </section>
        <section className="flex gap-5 mt-5">
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm font-semibold">
              {" "}
              Approved Transaction Amount/Day
            </p>
            <h5 className="text-primary text-xl mb-3">
              ₦
              {isLoading ? "00" : dashn?.approvedTransactionAmountForTheDay?.toLocaleString(
                "en-US",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              ) || " 0.00"}
            </h5>
          </div>
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm font-semibold">
              {" "}
              Declined Transaction Amount/Day
            </p>
            <h5 className="text-primary text-xl mb-3">
              ₦
              {isLoading ? "00" : dashn?.declinedTransactionAmountForTheDay?.toLocaleString(
                "en-US",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              ) || " 0.00"}
            </h5>
          </div>
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm font-semibold">
              {" "}
              Approved Transaction Count/Day{" "}
            </p>
            <h5 className="text-primary text-xl mb-3">
              {isLoading ? "00" : dashn?.approvedTransactionCountForTheDay || "0"}
            </h5>
          </div>
          <div
            className="bg-white rounded-2xl py-2 px-6 w-1/4"
            style={{ boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.10);" }}
          >
            <p className="mb-5 text-sm font-semibold">
              {" "}
              Declined Transaction Count/Day{" "}
            </p>
            <h5 className="text-primary text-xl mb-3">
              {isLoading ? "00" : dashn?.declinedTransactionCountForTheDay || "0"}
            </h5>
          </div>
        </section>
      </section>
      <section className="mt-10">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold text-dark">Transaction</h5>
          <button className="bg-white font-semibold text-sm border-[#828282] px-1 py-1 w-1/12 border text-primary rounded-lg">
            <Link href={"/user/transaction"}>View all</Link>
          </button>
        </div>
        <Table />
        {/* <p className="text-xs text-[#4B5563] font-bold">7/50 <span className="font-normal">results</span></p> */}
      </section>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <UserInvite setModalIsOpen={setIsOpen} modalIsOpen={isOpen} />
      </ReactModal>
    </div>
  );
};

export default Dashboard;
