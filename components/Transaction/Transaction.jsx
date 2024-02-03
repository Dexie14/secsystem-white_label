"use client";

import { useState } from "react";
import Button from "../Comps/Button";
import TransTable from "./TransTable";
import { useGetTrans } from "@/hooks/auth/useGetTrans";

import { CSVLink, CSVDownload } from "react-csv";

const Transaction = () => {
  const [terminal, setTerminal] = useState(false);
  
  const [merchId, setMerchId] = useState(false);
  const [merchant, setMerchant] = useState(false);
  const [date, setDate] = useState(false);
  const [trans, setTrans] = useState(false);

  const { data: transData, isLoading, isError } = useGetTrans();


  const [selectedStatus, setSelectedStatus] = useState("");
  const [inputTerminal, setInputTerminal] = useState("");
  
  const [inputMerchId, setInputMerchId] = useState("");
  const [inputTrans, setInputTrans] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [amount, setAmount] = useState("");
  const [dataToPass, setDataToPass] = useState("");



  const handleTerminalClick = (id) => {
    setInputTerminal("");
    setTerminal(false);
  };

  const handleMerchClick = (id) => {
    setInputMerchId("");
    setMerchId(false);
  };

  const handleTransClick = () => {
    setInputTrans("");
    setMerchant(false);
  };
  const handleStatusCliick = (id) => {
    setSelectedStatus(id);
    setMerchant(false);
  };

  const handleApplyClick = () => {
    setDataToPass({
      inputTerminal,
      inputTrans,
      fromDate,
      toDate,
      amount,
      selectedStatus,
      inputMerchId
    });
  };

  const handleResetClick = () => {
    setInputTerminal("");
    setInputTrans("");
    setFromDate("");
    setToDate("");
    setAmount("");
    setSelectedStatus("");
    setInputMerchId("");
    setDataToPass({
      inputTerminal: "",
      inputTrans: "",
      fromDate: "",
      toDate: "",
      amount: "",
      selectedStatus: "",
      inputMerchId: "",
    });
  };

 
  
  const [download, setDownload] = useState(false);


  return (
    <div className="h-[100%]">
      <section className="flex justify-between">
        <h1 className="text-2xl text-dark" style={{ fontFamily: "DMSans" }}>
          Transaction Overview
        </h1>
        <div className="flex gap-3 items-center">
          {/* {transData && (
            <CSVLink
              className="flex items-center justify-center gap-2 py-2 px-3 border border-border bg-white text-dark rounded-lg"
              data={transData?.items}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_1_1141)">
                  <path
                    d="M10.8332 10.8334V15.4876L12.3566 13.9642L13.5357 15.1434L9.99991 18.6784L6.46408 15.1434L7.64325 13.9642L9.16658 15.4876V10.8334H10.8332ZM9.99991 1.66675C11.4307 1.66682 12.8116 2.19268 13.8801 3.14435C14.9485 4.09602 15.63 5.40713 15.7949 6.82841C16.8318 7.11118 17.7363 7.74934 18.3505 8.63136C18.9646 9.51337 19.2492 10.5832 19.1546 11.6537C19.06 12.7243 18.5922 13.7276 17.8329 14.4883C17.0736 15.2489 16.0712 15.7185 15.0007 15.8151V14.1367C15.3842 14.082 15.7529 13.9514 16.0854 13.7526C16.4179 13.5537 16.7074 13.2907 16.937 12.9788C17.1667 12.6668 17.332 12.3123 17.4231 11.9358C17.5143 11.5593 17.5296 11.1684 17.468 10.786C17.4065 10.4035 17.2694 10.0372 17.0647 9.70829C16.86 9.37941 16.5919 9.0946 16.2759 8.87047C15.96 8.64635 15.6025 8.48741 15.2245 8.40292C14.8465 8.31844 14.4554 8.31011 14.0741 8.37841C14.2046 7.77082 14.1975 7.14172 14.0534 6.53721C13.9093 5.93269 13.6318 5.36807 13.2412 4.88469C12.8507 4.40131 12.3569 4.01142 11.7961 3.74358C11.2354 3.47573 10.6218 3.33672 10.0003 3.33672C9.37887 3.33672 8.76529 3.47573 8.20452 3.74358C7.64375 4.01142 7.14999 4.40131 6.75941 4.88469C6.36884 5.36807 6.09134 5.93269 5.94723 6.53721C5.80313 7.14172 5.79607 7.77082 5.92658 8.37841C5.16629 8.23564 4.38043 8.40074 3.74187 8.83738C3.1033 9.27403 2.66435 9.94646 2.52158 10.7067C2.3788 11.467 2.5439 12.2529 2.98055 12.8915C3.41719 13.53 4.08963 13.969 4.84991 14.1117L4.99991 14.1367V15.8151C3.92945 15.7187 2.92692 15.2492 2.16752 14.4886C1.40813 13.728 0.940184 12.7247 0.845474 11.6541C0.750763 10.5835 1.03531 9.51365 1.64939 8.63156C2.26346 7.74947 3.168 7.11124 4.20491 6.82841C4.36967 5.40706 5.05108 4.09584 6.11956 3.14414C7.18804 2.19243 8.56904 1.66663 9.99991 1.66675Z"
                    fill="#4F4F4F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_1141">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>{" "}
              Download
            </CSVLink>
          )} */}
          <button   onClick={() => setDownload(true)} className="flex items-center justify-center gap-2 py-2 px-3 border border-border bg-white text-dark rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_1_1141)">
                <path
                  d="M10.8332 10.8334V15.4876L12.3566 13.9642L13.5357 15.1434L9.99991 18.6784L6.46408 15.1434L7.64325 13.9642L9.16658 15.4876V10.8334H10.8332ZM9.99991 1.66675C11.4307 1.66682 12.8116 2.19268 13.8801 3.14435C14.9485 4.09602 15.63 5.40713 15.7949 6.82841C16.8318 7.11118 17.7363 7.74934 18.3505 8.63136C18.9646 9.51337 19.2492 10.5832 19.1546 11.6537C19.06 12.7243 18.5922 13.7276 17.8329 14.4883C17.0736 15.2489 16.0712 15.7185 15.0007 15.8151V14.1367C15.3842 14.082 15.7529 13.9514 16.0854 13.7526C16.4179 13.5537 16.7074 13.2907 16.937 12.9788C17.1667 12.6668 17.332 12.3123 17.4231 11.9358C17.5143 11.5593 17.5296 11.1684 17.468 10.786C17.4065 10.4035 17.2694 10.0372 17.0647 9.70829C16.86 9.37941 16.5919 9.0946 16.2759 8.87047C15.96 8.64635 15.6025 8.48741 15.2245 8.40292C14.8465 8.31844 14.4554 8.31011 14.0741 8.37841C14.2046 7.77082 14.1975 7.14172 14.0534 6.53721C13.9093 5.93269 13.6318 5.36807 13.2412 4.88469C12.8507 4.40131 12.3569 4.01142 11.7961 3.74358C11.2354 3.47573 10.6218 3.33672 10.0003 3.33672C9.37887 3.33672 8.76529 3.47573 8.20452 3.74358C7.64375 4.01142 7.14999 4.40131 6.75941 4.88469C6.36884 5.36807 6.09134 5.93269 5.94723 6.53721C5.80313 7.14172 5.79607 7.77082 5.92658 8.37841C5.16629 8.23564 4.38043 8.40074 3.74187 8.83738C3.1033 9.27403 2.66435 9.94646 2.52158 10.7067C2.3788 11.467 2.5439 12.2529 2.98055 12.8915C3.41719 13.53 4.08963 13.969 4.84991 14.1117L4.99991 14.1367V15.8151C3.92945 15.7187 2.92692 15.2492 2.16752 14.4886C1.40813 13.728 0.940184 12.7247 0.845474 11.6541C0.750763 10.5835 1.03531 9.51365 1.64939 8.63156C2.26346 7.74947 3.168 7.11124 4.20491 6.82841C4.36967 5.40706 5.05108 4.09584 6.11956 3.14414C7.18804 2.19243 8.56904 1.66663 9.99991 1.66675Z"
                  fill="#4F4F4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1141">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Download
          </button>
        </div>
      </section>
      <section className="flex flex-wrap gap-3 items-center mt-10 mb-5">
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
        <aside className="bg-white w-[120px] flex gap-2 flex-col relative cursor-pointer">
          <div
            className={`flex justify-center text-dark border-border px-1 py-2 border text-sm ${
              terminal ? "rounded-t-lg" : "rounded-lg"
            } gap-1 items-center w-full`}
            onClick={() => setTerminal(!terminal)}
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
          {terminal && (
            
            <div className="bg-white absolute top-[100%] rounded-b-lg border border-border border-t-0 w-full z-[1000]">
              {inputTerminal && (
                <p
                  onClick={() => handleTerminalClick("")}
                  className={`text-dark text-sm mx-4 my-2 flex justify-center py-2 border border-border rounded ${
                    !inputTerminal ? "bg-gray-300" : ""
                  }`}
                >
                  Default
                </p>
              )}
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  onChange={(e) => setInputTerminal(e.target.value)}
                  value={inputTerminal}
                  className=" text-dark text-center w-full text-xs mx-1 my-2 flex justify-center py-2 border border-border rounded outline-none"
                />
              </div>
            </div>
          )}
        </aside>
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
        <aside className="bg-white w-[160px] flex gap-2 flex-col relative cursor-pointer">
          <div
            className={`flex justify-center text-dark border-border px-1 py-2 border text-sm ${
              merchant ? "rounded-t-lg" : "rounded-lg"
            } gap-1 items-center w-full`}
            onClick={() => setMerchant(!merchant)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_1176)">
                <path
                  d="M7.99984 9.33342V10.6667C6.93897 10.6667 5.92156 11.0882 5.17141 11.8383C4.42126 12.5885 3.99984 13.6059 3.99984 14.6667H2.6665C2.6665 13.2523 3.22841 11.8957 4.2286 10.8955C5.2288 9.89532 6.58535 9.33342 7.99984 9.33342ZM7.99984 8.66675C5.78984 8.66675 3.99984 6.87675 3.99984 4.66675C3.99984 2.45675 5.78984 0.666748 7.99984 0.666748C10.2098 0.666748 11.9998 2.45675 11.9998 4.66675C11.9998 6.87675 10.2098 8.66675 7.99984 8.66675ZM7.99984 7.33342C9.47317 7.33342 10.6665 6.14008 10.6665 4.66675C10.6665 3.19341 9.47317 2.00008 7.99984 2.00008C6.5265 2.00008 5.33317 3.19341 5.33317 4.66675C5.33317 6.14008 6.5265 7.33342 7.99984 7.33342ZM11.9998 14.3334L10.0405 15.3634L10.4145 13.1821L8.82984 11.6367L11.0205 11.3181L11.9998 9.33342L12.9798 11.3181L15.1698 11.6367L13.5852 13.1821L13.9585 15.3634L11.9998 14.3334Z"
                  fill="#4F4F4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1176">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Transaction Id
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
          {merchant && (
            <div className="bg-white absolute top-[100%] rounded-b-lg border border-border border-t-0 w-full z-[1000]">
              {inputTrans && (
                <p
                  onClick={() => handleTransClick("")}
                  className={`text-dark text-sm mx-4 my-2 flex justify-center py-2 border border-border rounded ${
                    !inputTrans ? "bg-gray-300" : ""
                  }`}
                >
                  Default
                </p>
              )}
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  onChange={(e) => setInputTrans(e.target.value)}
                  value={inputTrans}
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
        <aside className="bg-white w-[135px] flex gap-2 flex-col relative cursor-pointer">
          <div
            className={`flex justify-center text-dark border-border px-1 py-2 border text-sm ${
              trans ? "rounded-t-lg" : "rounded-lg"
            } gap-1 items-center w-full`}
            onClick={() => setTrans(!trans)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1_3244)">
                <path
                  d="M3.33333 3.06935V9.19269C3.33334 9.63166 3.44172 10.0638 3.64884 10.4509C3.85597 10.8379 4.15543 11.1678 4.52067 11.4114L8 13.7314L11.4793 11.4114C11.8445 11.1679 12.1439 10.8381 12.351 10.4512C12.5581 10.0643 12.6665 9.63221 12.6667 9.19335V3.06935L8 2.03335L3.33333 3.06935ZM2.522 1.88402L8 0.666687L13.478 1.88402C13.626 1.91693 13.7584 1.99933 13.8533 2.11762C13.9482 2.23592 14 2.38303 14 2.53469V9.19269C14 9.85118 13.8373 10.4995 13.5266 11.08C13.2158 11.6606 12.7666 12.1554 12.2187 12.5207L8 15.3334L3.78133 12.5207C3.23352 12.1555 2.78431 11.6608 2.47357 11.0803C2.16282 10.4999 2.00016 9.85173 2 9.19335V2.53469C2.00003 2.38303 2.05176 2.23592 2.14666 2.11762C2.24156 1.99933 2.37396 1.91693 2.522 1.88402ZM8 9.00002L6.04067 10.03L6.41467 7.84869L4.83 6.30335L7.02067 5.98469L8 4.00002L8.98 5.98469L11.17 6.30335L9.58533 7.84869L9.95867 10.03L8 9.00002Z"
                  fill="#4F4F4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_3244">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {selectedStatus ? selectedStatus : "Status"}

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
          {trans && (
            <div className="bg-white absolute top-[100%] rounded-b-lg border border-border border-t-0 w-full z-[1000]">
              {selectedStatus && (
                <p
                  onClick={() => handleStatusCliick("")}
                  className={`text-dark text-sm mx-4 my-2 flex justify-center py-2 border border-border rounded ${
                    !selectedStatus ? "bg-gray-300" : ""
                  }`}
                >
                  Default
                </p>
              )}

              <p
                onClick={() => handleStatusCliick("success")}
                className="flex gap-1 text-sm font-normal text-[#165E3D]  bg-[#EDFFEA] w-fit mx-4 my-2 py-2 px-3  justify-center items-center rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M8.53312 14.6667C4.85122 14.6667 1.86646 11.6819 1.86646 8.00004C1.86646 4.31814 4.85122 1.33337 8.53312 1.33337C12.215 1.33337 15.1998 4.31814 15.1998 8.00004C15.1998 11.6819 12.215 14.6667 8.53312 14.6667ZM7.86819 10.6667L12.5823 5.95266L11.6395 5.00985L7.86819 8.78111L5.98259 6.89544L5.03978 7.83831L7.86819 10.6667Z"
                    fill="#165E3D"
                  />
                </svg>
                Succeeded
              </p>
              <p
                onClick={() => handleStatusCliick("pending")}
                className="flex gap-1 text-sm font-normal text-[#B5850B]  bg-[#FFF6E9] w-fit mx-4 my-2 py-2 px-3  justify-center items-center rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M8.49992 14.6666C4.81802 14.6666 1.83325 11.6818 1.83325 7.99998C1.83325 4.31808 4.81802 1.33331 8.49992 1.33331C12.1818 1.33331 15.1666 4.31808 15.1666 7.99998C15.1666 11.6818 12.1818 14.6666 8.49992 14.6666ZM9.16658 7.99998V4.66665H7.83325V9.33331H11.8333V7.99998H9.16658Z"
                    fill="#B5850B"
                  />
                </svg>
                Pending
              </p>
              <p
                onClick={() => handleStatusCliick("failed")}
                className="flex gap-1 text-sm font-normal text-[#B83131]  bg-[#FFEAEA] w-fit mx-4 my-2 py-2 px-3  justify-center items-center rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666ZM4.66658 7.33331V8.66665H11.3333V7.33331H4.66658Z"
                    fill="#B83131"
                  />
                </svg>
                Failed
              </p>
            </div>
          )}
        </aside>
        <div className="w-1/12">
          <Button onClick={handleApplyClick} className="py-2 px-2">
            APPLY
          </Button>
        </div>
        <div className="w-fit">
          <Button onClick={handleResetClick} className="py-2 px-2">
            RESET
          </Button>
        </div>
        {/* <div className="flex gap-3 rounded-lg border bg-[#FBFBFB] border-[#E0E0E0] px-2 py-2 w-[275px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clip-path="url(#clip0_1_911)">
              <path
                d="M9.16675 1.66669C13.3067 1.66669 16.6667 5.02669 16.6667 9.16669C16.6667 13.3067 13.3067 16.6667 9.16675 16.6667C5.02675 16.6667 1.66675 13.3067 1.66675 9.16669C1.66675 5.02669 5.02675 1.66669 9.16675 1.66669ZM9.16675 15C12.3892 15 15.0001 12.3892 15.0001 9.16669C15.0001 5.94335 12.3892 3.33335 9.16675 3.33335C5.94341 3.33335 3.33341 5.94335 3.33341 9.16669C3.33341 12.3892 5.94341 15 9.16675 15ZM16.2376 15.0592L18.5951 17.4159L17.4159 18.595L15.0592 16.2375L16.2376 15.0592Z"
                fill="#828282"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_911">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            onChange={(e) => setAmount(e.target.value)}
            className="border-0 bg-[#FBFBFB] outline-none w-full text-sm "
            type="text"
            value={amount}
            placeholder="Search by amount , payment method..."
          />
        </div> */}
      </section>
      <TransTable paramlist={dataToPass} download={download} setDownload={setDownload}/>
    </div>
  );
};

export default Transaction;
