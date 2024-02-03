"use client";
import { useState } from "react";
import ReactModal from "react-modal";

import TransDetails from "./TransDetails";

import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseUrl";
import moment from "moment";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { Spinner } from "../Spinner";
import Download from "../Terminal/Download";
import Button from "../Comps/Button";
const { token } = useToken();

const TransTable = ({ paramlist, download, setDownload }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTransactionId, setSelectedTransactionId] = useState("");


  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
      refetch();
    }
  };

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

  const param = {
    terminalId: paramlist?.inputTerminal,
    merchantId: paramlist?.inputMerchId,
    transactionId: paramlist?.inputTrans,
    responsemessage: paramlist?.selectedStatus,
    amount: paramlist?.amount,
    from: paramlist?.fromDate,
    to: paramlist?.toDate,
    pageSize: pageSize,
    page: page,
    enable: false,
  };

  const para = {
    terminalId: paramlist?.inputTerminal,
    merchantId: paramlist?.inputMerchId,
    transactionId: paramlist?.inputTrans,
    responsemessage: paramlist?.selectedStatus,
    amount: paramlist?.amount,
    from: paramlist?.fromDate,
    to: paramlist?.toDate,
    download: true,
    enable: false,
  };

  const getTransaction = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/transaction`, {
        params: param,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === "success") {
        return response?.data?.data;
      } else {
        throw new Error(response.data?.data?.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error?.response?.data?.error?.message);
      } else if (error instanceof Error) {
        throw error;
      } else throw new Error("Error occurred");
    }
  };

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransaction(),
  });

  const getDown = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/transaction`, {
        params: para,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === "success") {
        return response?.data?.data;
      } else {
        throw new Error(response.data?.data?.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error?.response?.data?.error?.message);
      } else if (error instanceof Error) {
        throw error;
      } else throw new Error("Error occurred");
    }
  };
  const {
    data: downL,
    refetch: mutate,
  } = useQuery({
    queryKey: ["TAB"],
    queryFn: () => getDown(),
    cacheTime: 0,
    staleTime: 0,
  });


  useEffect(() => {
    if (paramlist && Object.keys(paramlist).length !== 0) {
      refetch();
      mutate();
    }
  }, [paramlist, pageSize, page, refetch, mutate]);

  useEffect(() => {
    if (page >= 1) {
      setPage(page);
      refetch();
      mutate();
    }
  }, [pageSize, page, refetch, mutate]);

  const totalPages = Math.ceil(transactions?.totalCount / pageSize);

  const [selected, setSelected] = useState([]);

  // Function to handle the click event on the checkbox
  const handleCheckboxClick = (item) => {
    // Check if the item is already in the selected array
    const isSelected = selected.some(
      (selectedItem) => selectedItem.transactionId === item.transactionId
    );

    // If it's selected, remove it; otherwise, add it to the array
    setSelected((prevSelected) =>
      isSelected
        ? prevSelected.filter((selectedItem) => selectedItem.transactionId !== item.transactionId)
        : [...prevSelected, item]
    );
  };


  return (
    <div>
      <table className=" w-full table-auto tabling overflow-x-scroll">
        <thead className="text-left mb-3 border-b-4">
          <tr className="bg-secondary px-3">
            <th className="py-4 pl-2 ">{/* <input type="checkbox" /> */}</th>
            <th className="py-4 text-sm font-semibold text-[#333333] pl-2">
              Terminal ID
            </th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">
              Transaction ID
            </th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">
              RspCode
            </th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">RRN</th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">
              Status
            </th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">Stan</th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">
              Created Date
            </th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">
              Amount
            </th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">
              RspMsg
            </th>
            <th className=" text-sm font-semibold px-2 text-[#333333]">
              Action
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <Spinner />
        ) : transactions ? (
          <tbody className="bg-white cursor-pointer ">
            {Array.isArray(transactions?.items) && transactions?.items?.length > 0 ? (
              transactions?.items?.map((item, index) => (
                <tr
                  className="bg-white border-b-4"
                  style={{
                    boxShadow: "0px 2px 2px 0px rgba(34, 34, 34, 0.10);",
                  }}
                  key={index}
                >
                  <td className="pl-2">
                    <input
                      type="checkbox"
                      checked={selected.some(
                        (selectedItem) => selectedItem.transactionId === item.transactionId
                      )}
                      onChange={() => handleCheckboxClick(item)}
                    />
                  </td>
                  <td className="text-sm font-normal text-[#333333] py-4 pl-2">
                    {item?.terminalId}
                  </td>
                  <td className="text-sm font-normal px-2 text-[#333333]">
                    {item?.transactionId.substring(0, 7)}...
                  </td>
                  <td className="text-sm font-normal px-2 text-[#333333]">
                    {item?.responseCode}
                  </td>
                  <td className="text-sm font-normal px-2 text-[#333333]">
                    {item?.rrn.substring(0, 5)}...
                  </td>
                  {item?.status === "approved" ? (
                    <td className="flex gap-1 text-sm font-normal px-2 text-[#333333]  bg-[#EDFFEA] w-fit mt-3 justify-center items-center rounded">
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
                      {item?.status}
                    </td>
                  ) : item?.status === "failed" ? (
                    <td className="flex gap-1 text-sm font-normal px-2 text-[#333333]  bg-[#FFEAEA] w-fit mt-3 justify-center items-center rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M8.53312 14.6667C4.85122 14.6667 1.86646 11.6819 1.86646 8.00004C1.86646 4.31814 4.85122 1.33337 8.53312 1.33337C12.215 1.33337 15.1998 4.31814 15.1998 8.00004C15.1998 11.6819 12.215 14.6667 8.53312 14.6667ZM5.19979 7.33337V8.66671H11.8665V7.33337H5.19979Z"
                          fill="#B83131"
                        />
                      </svg>
                      {item?.status}
                    </td>
                  ) : (
                    <td className="flex gap-1 text-sm font-normal px-2 text-[#333333] w-fit  mt-3 justify-center items-center rounded">
                      {item?.status}
                    </td>
                  )}
                  <td className="text-sm font-normal px-2 text-[#333333]">
                    {item?.stan}
                  </td>
                  <td className="text-sm font-normal px-2 text-[#333333]">
                    {moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                  </td>
                  <td className="text-sm font-normal px-2 text-[#333333]">
                    {/* ₦{item?.amount.toFixed(2)} */}₦
                    {item?.amount?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {item?.responsemessage === "success" ? (
                    <td className="flex gap-1 text-sm font-normal px-2 text-[#333333]  bg-[#EDFFEA] w-fit mt-3 justify-center items-center rounded">
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
                      {item?.responsemessage}
                    </td>
                  ) : item?.responsemessage === "failed" ? (
                    <td className="flex gap-1 text-sm font-normal px-2 text-[#333333]  bg-[#FFEAEA] w-fit  mt-3 justify-center items-center rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M8.53312 14.6667C4.85122 14.6667 1.86646 11.6819 1.86646 8.00004C1.86646 4.31814 4.85122 1.33337 8.53312 1.33337C12.215 1.33337 15.1998 4.31814 15.1998 8.00004C15.1998 11.6819 12.215 14.6667 8.53312 14.6667ZM5.19979 7.33337V8.66671H11.8665V7.33337H5.19979Z"
                          fill="#B83131"
                        />
                      </svg>
                      {item?.responsemessage}
                    </td>
                  ) : (
                    <td className="flex gap-1 text-sm font-normal px-2 text-[#333333]  w-fit  mt-3 justify-center items-center rounded">
                      {item?.responsemessage}
                    </td>
                  )}

                  <td
                    className="relative text-sm font-normal px-2 text-[#333333] cursor-pointer "
                    onClick={() => {
                      setSelectedTransactionId(item?.transactionId);
                      setIsOpen(true);
                    }}
                  >
                    <Button className="px-1 py-1">View</Button>
                  </td>
                </tr>
              ))
            ) : (
              <p className="my-10 text-center ">No data available</p>
            )}
          </tbody>
        ) : (
          <p>no data available</p>
        )}
      </table>
      <section className="flex gap-2 justify-end items-center cursor-pointer mb-20">
        <p
          onClick={() => handlePageChange(page - 1)}
          className="cursor-pointer flex text-sm font-normal text-[#4B5563] border border-[#F0F2F4] bg-[#fff] w-fit py-2 px-2 justify-center items-center rounded-lg"
        >
          Previous
        </p>
        {/* Render page numbers dynamically based on the total number of pages */}
        {Array.from(
          { length: Math.ceil(transactions?.totalCount / pageSize) },
          (_, index) => (
            <p
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`flex text-sm font-normal text-[#4B5563] border border-[#E0E0E0] bg-[#fff] w-fit py-2 px-4 justify-center items-center rounded-2xl ${
                page === index + 1 ? "bg-[#E0E0E0]" : ""
              }`}
            >
              {index + 1}
            </p>
          )
        )}
        <p className="flex text-sm font-normal text-[#4B5563] border border-[#E0E0E0]  bg-[#fff] w-fit py-2 px-4 justify-center items-center rounded-2xl">
          {page}
        </p>
        <p
          onClick={() => handlePageChange(page + 1)}
          className="cursor-pointer flex text-sm font-normal text-[#4B5563] border border-[#F0F2F4] bg-[#fff] w-fit py-2 px-2 justify-center items-center rounded-lg"
        >
          Next
        </p>
        {totalPages > 0 && (
          <p
            onClick={() => handlePageChange(totalPages)}
            className={`flex text-sm font-normal text-[#4B5563] border border-[#F0F2F4] bg-[#fff] w-fit py-2 px-2 justify-center items-center rounded-lg ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Last
          </p>
        )}
      </section>
      {/* <div className="flex justify-between items-center cursor-pointer">
        <p className="text-xs text-[#4B5563] font-bold">
          10/50 <span className="font-normal">results</span>
        </p>
        <section className="flex gap-2 items-center">
          <p className="flex text-sm font-normal text-[#4B5563] border border-[#F0F2F4]  bg-[#fff] w-fit py-2 px-2 justify-center items-center rounded-lg">
            Previous
          </p>
          <p className="flex text-sm font-normal text-[#4B5563] border border-[#E0E0E0]  bg-[#fff] w-fit py-2 px-4 justify-center items-center rounded-2xl">
            1
          </p>
          <p className="flex text-sm font-normal text-[#4B5563] border border-[#E0E0E0]  bg-[#fff] w-fit py-2 px-4 justify-center items-center rounded-2xl">
            2
          </p>
          <p className="flex text-sm font-normal text-[#4B5563] border border-[#E0E0E0]  bg-[#fff] w-fit py-2 px-4 justify-center items-center rounded-2xl">
            3
          </p>
          <p className="flex text-sm font-normal text-[#4B5563] border border-[#E0E0E0]  bg-[#fff] w-fit py-2 px-4 justify-center items-center rounded-2xl">
            4
          </p>
          <p className="flex text-sm font-normal text-[#4B5563] border border-[#F0F2F4]  bg-[#fff] w-fit py-2 px-2 justify-center items-center rounded-lg">
            Next
          </p>
        </section>
      </div> */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <TransDetails
          setModalIsOpen={setIsOpen}
          modalIsOpen={isOpen}
          selectedTransactionId={selectedTransactionId}
        />
      </ReactModal>
      <ReactModal
        isOpen={download}
        onRequestClose={() => setDownload(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <Download
          setModalIsOpen={setDownload}
          modalIsOpen={download}
          setSelected={setSelected}
          selected={selected}
          fullData={downL}
        />
      </ReactModal>
    </div>
  );
};

export default TransTable;
