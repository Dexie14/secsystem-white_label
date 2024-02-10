"use client";

import React, { useState } from "react";
import Button from "../Comps/Button";

import Cookies from "js-cookie";

import { BASE_URL } from "@/utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Report = () => {
  const [merchId, setMerchId] = useState(false);
  const [termmId, setTermmId] = useState(false);

  const [date, setDate] = useState(false);

  const [inputMerchId, setInputMerchId] = useState("");
  const [inputTermId, setInputTermId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleMerchClick = (id) => {
    setInputMerchId("");
    setMerchId(false);
  };
  const handleTermClick = (id) => {
    setInputTermId("");
    setTermmId(false);
  };

  const handleResetClick = () => {
    setFromDate("");
    setToDate("");
    setInputMerchId("");
    setInputTermId("");
  };

  const handleDownload = () => {
    const url = `${BASE_URL}/admin/report?merchantId=${inputMerchId}&terminalId=${inputTermId}&startDate=${fromDate}&endDate=${toDate}`;

    // Get the authorization token from wherever it's stored in your application (e.g., state, context, etc.)
    const token = Cookies.get("token");

    // Use the Fetch API to initiate the download with headers
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response, "fff")
          return response.blob();
        } else {
          toast.error(
            response?.data?.status ||
            response?.message ||
              "Error occured"
          );
          throw new Error(
            `Failed to download. HTTP Status: ${response.status}`
          );
        }
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "report.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.status || error?.response?.data?.message || "Error occured");
        console.error("Error during download:", error);
      });
  };

  return (
    <div className="h-[100%]">
      <section className="flex justify-between">
        <h1 className="text-2xl text-dark" style={{ fontFamily: "DMSans" }}>
          Transaction Report Overview
        </h1>
      </section>

      <section className="flex flex-wrap gap-3 items-center mt-10 mb-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_1_1161)">
            <path
              d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_1161">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <aside className="bg-white w-[150px] flex gap-2 flex-col relative cursor-pointer">
          <div
            className={`flex justify-center text-dark border-border px-1 py-2 border text-sm ${
              merchId ? "rounded-t-lg" : "rounded-lg"
            } gap-1 items-center w-full`}
            onClick={() => setMerchId(!merchId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_837)">
                <path
                  d="M6.66658 14H1.99992C1.82311 14 1.65354 13.9298 1.52851 13.8047C1.40349 13.6797 1.33325 13.5101 1.33325 13.3333V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H6.66658C6.66658 2.35362 6.80706 2.69276 7.05711 2.94281C7.30716 3.19286 7.6463 3.33333 7.99992 3.33333C8.35354 3.33333 8.69268 3.19286 8.94273 2.94281C9.19278 2.69276 9.33325 2.35362 9.33325 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V13.3333C14.6666 13.5101 14.5963 13.6797 14.4713 13.8047C14.3463 13.9298 14.1767 14 13.9999 14H9.33325C9.33325 13.6464 9.19278 13.3072 8.94273 13.0572C8.69268 12.8071 8.35354 12.6667 7.99992 12.6667C7.6463 12.6667 7.30716 12.8071 7.05711 13.0572C6.80706 13.3072 6.66658 13.6464 6.66658 14ZM5.68992 12.6667C5.92391 12.2611 6.26062 11.9243 6.66614 11.6903C7.07166 11.4562 7.53169 11.3331 7.99992 11.3333C8.98658 11.3333 9.84859 11.8693 10.3099 12.6667H13.3333V3.33333H10.3099C10.0759 3.7389 9.73922 4.07566 9.33369 4.30973C8.92817 4.5438 8.46814 4.66691 7.99992 4.66667C7.53169 4.66691 7.07166 4.5438 6.66614 4.30973C6.26062 4.07566 5.92391 3.7389 5.68992 3.33333H2.66659V12.6667H5.68992ZM3.99992 5.33333H5.33325V10.6667H3.99992V5.33333ZM10.6666 5.33333H11.9999V10.6667H10.6666V5.33333Z"
                  fill="#4F4F4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_837">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Merchant ID
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_842)">
                <path
                  d="M8.00005 9.99997L5.17139 7.1713L6.11472 6.22864L8.00005 8.11464L9.88539 6.22864L10.8287 7.1713L8.00005 9.99997Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_842">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {merchId && (
            <div className="bg-white absolute top-[100%] rounded-b-lg border border-border border-t-0 w-full z-[1000]">
              {inputMerchId && (
                <p
                  onClick={() => handleMerchClick("")}
                  className={`text-dark text-center text-sm mx-4 my-2 flex justify-center py-2 border border-border rounded ${
                    !inputMerchId ? "bg-gray-300" : ""
                  }`}
                >
                  Default
                </p>
              )}
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  onChange={(e) => setInputMerchId(e.target.value)}
                  value={inputMerchId}
                  className=" text-dark text-center w-full text-xs mx-1 my-2 flex justify-center py-2 border border-border rounded outline-none"
                />
              </div>
            </div>
          )}
        </aside>
        <aside className="bg-white w-[150px] flex gap-2 flex-col relative cursor-pointer">
          <div
            className={`flex justify-center text-dark border-border px-1 py-2 border text-sm ${
              termmId ? "rounded-t-lg" : "rounded-lg"
            } gap-1 items-center w-full`}
            onClick={() => setTermmId(!termmId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_837)">
                <path
                  d="M6.66658 14H1.99992C1.82311 14 1.65354 13.9298 1.52851 13.8047C1.40349 13.6797 1.33325 13.5101 1.33325 13.3333V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H6.66658C6.66658 2.35362 6.80706 2.69276 7.05711 2.94281C7.30716 3.19286 7.6463 3.33333 7.99992 3.33333C8.35354 3.33333 8.69268 3.19286 8.94273 2.94281C9.19278 2.69276 9.33325 2.35362 9.33325 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V13.3333C14.6666 13.5101 14.5963 13.6797 14.4713 13.8047C14.3463 13.9298 14.1767 14 13.9999 14H9.33325C9.33325 13.6464 9.19278 13.3072 8.94273 13.0572C8.69268 12.8071 8.35354 12.6667 7.99992 12.6667C7.6463 12.6667 7.30716 12.8071 7.05711 13.0572C6.80706 13.3072 6.66658 13.6464 6.66658 14ZM5.68992 12.6667C5.92391 12.2611 6.26062 11.9243 6.66614 11.6903C7.07166 11.4562 7.53169 11.3331 7.99992 11.3333C8.98658 11.3333 9.84859 11.8693 10.3099 12.6667H13.3333V3.33333H10.3099C10.0759 3.7389 9.73922 4.07566 9.33369 4.30973C8.92817 4.5438 8.46814 4.66691 7.99992 4.66667C7.53169 4.66691 7.07166 4.5438 6.66614 4.30973C6.26062 4.07566 5.92391 3.7389 5.68992 3.33333H2.66659V12.6667H5.68992ZM3.99992 5.33333H5.33325V10.6667H3.99992V5.33333ZM10.6666 5.33333H11.9999V10.6667H10.6666V5.33333Z"
                  fill="#4F4F4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_837">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Terminal ID
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_842)">
                <path
                  d="M8.00005 9.99997L5.17139 7.1713L6.11472 6.22864L8.00005 8.11464L9.88539 6.22864L10.8287 7.1713L8.00005 9.99997Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_842">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {termmId && (
            <div className="bg-white absolute top-[100%] rounded-b-lg border border-border border-t-0 w-full z-[1000]">
              {inputTermId && (
                <p
                  onClick={() => handleTermClick("")}
                  className={`text-dark text-center text-sm mx-4 my-2 flex justify-center py-2 border border-border rounded ${
                    !inputTermId ? "bg-gray-300" : ""
                  }`}
                >
                  Default
                </p>
              )}
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  onChange={(e) => setInputTermId(e.target.value)}
                  value={inputTermId}
                  className=" text-dark text-center w-full text-xs mx-1 my-2 flex justify-center py-2 border border-border rounded outline-none"
                />
              </div>
            </div>
          )}
        </aside>
        <aside className="bg-white w-[210px] flex gap-2 flex-col relative cursor-pointer">
          <div
            className={`flex justify-center text-dark border-border px-1 py-2 border text-sm ${
              date ? "rounded-t-lg" : "rounded-lg"
            } gap-1 items-center w-full`}
            onClick={() => setDate(!date)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_865)">
                <path
                  d="M11.3333 2.00002H13.9999C14.1767 2.00002 14.3463 2.07026 14.4713 2.19528C14.5963 2.32031 14.6666 2.48988 14.6666 2.66669V13.3334C14.6666 13.5102 14.5963 13.6797 14.4713 13.8048C14.3463 13.9298 14.1767 14 13.9999 14H1.99992C1.82311 14 1.65354 13.9298 1.52851 13.8048C1.40349 13.6797 1.33325 13.5102 1.33325 13.3334V2.66669C1.33325 2.48988 1.40349 2.32031 1.52851 2.19528C1.65354 2.07026 1.82311 2.00002 1.99992 2.00002H4.66658V0.666687H5.99992V2.00002H9.99992V0.666687H11.3333V2.00002ZM13.3333 6.00002V3.33335H11.3333V4.66669H9.99992V3.33335H5.99992V4.66669H4.66658V3.33335H2.66659V6.00002H13.3333ZM13.3333 7.33335H2.66659V12.6667H13.3333V7.33335ZM3.99992 8.66669H7.33325V11.3334H3.99992V8.66669Z"
                  fill="#4F4F4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_865">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Date
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_842)">
                <path
                  d="M8.00005 9.99997L5.17139 7.1713L6.11472 6.22864L8.00005 8.11464L9.88539 6.22864L10.8287 7.1713L8.00005 9.99997Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_842">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {date && (
            <div className="bg-white absolute top-[100%] rounded-b-lg border border-border border-t-0 w-full z-[1000]">
              <div className="flex justify-center items-center">
                <input
                  onChange={(e) => setFromDate(e.target.value)}
                  type="date"
                  value={fromDate}
                  className=" text-dark text-xs mx-1 my-2 flex justify-center py-2 border border-border rounded"
                />
                "to"
                <input
                  onChange={(e) => setToDate(e.target.value)}
                  type="date"
                  value={toDate}
                  className=" text-dark text-xs mx-1 my-2 flex justify-center py-2  border border-border rounded"
                />
              </div>
            </div>
          )}
        </aside>
        <div className="w-fit">
          <Button onClick={handleDownload} className="py-2 px-2">
            DOWNLOAD
          </Button>
        </div>
        <div className="w-fit">
          <Button onClick={handleResetClick} className="py-2 px-2">
            RESET
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Report;
