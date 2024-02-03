import Image from "next/image";
import success from "@/public/assets/auth/success.svg";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseUrl";
import moment from "moment";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { toast } from "react-toastify";
import { Spinner } from "../Spinner";
import Button from "../Comps/Button";
const { token } = useToken();

const TransDetails = ({
  setModalIsOpen,
  modalIsOpen,
  selectedTransactionId,
}) => {
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const getSingleTrans = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/transaction/${selectedTransactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status === "success") {
        return response?.data?.data;
      } else {
        throw new Error(response.data?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.status === "error") {
        setModalIsOpen(false);
      }
      toast.error(error?.response?.data?.message);
      if (error instanceof AxiosError) {
        throw new Error(error?.response?.data?.error?.message);
      } else if (error instanceof Error) {
        throw error;
      } else throw new Error("Error occurred");
    }
  };

  const { data: singleTransaction } = useQuery({
    queryKey: ["singleTrans"],
    queryFn: () => getSingleTrans(),
  });


  const data = singleTransaction?.transactionNotification;



  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-between pb-3 border-b-2 border-[#828282]">
        <h3 className="text-xl font-semibold">Transaction Details</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          className="cursor-pointer"
          onClick={handleCloseModal}
        >
          <g clip-path="url(#clip0_2_4170)">
            <path
              d="M15 13.2324L21.1875 7.04492L22.955 8.81242L16.7675 14.9999L22.955 21.1874L21.1875 22.9549L15 16.7674L8.81254 22.9549L7.04504 21.1874L13.2325 14.9999L7.04504 8.81242L8.81254 7.04492L15 13.2324Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_4170">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </section>
      <section className="my-6 ml-3">
        <div className="flex flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Response Code:
            <span className="text-[#828282] font-medium">
              {" "}
              {data?.responseCode}
            </span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Amount:{" "}
            <span className="text-[#828282] font-medium">
              ₦
              {data?.amount?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Expiry:
            <span className="text-[#828282] font-medium"> {data?.expiry}</span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Host:{" "}
            <span className="text-[#828282] font-medium">{data?.host}</span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Pan:
            <span className="text-[#828282] font-medium"> {data?.pan}</span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Refcode:{" "}
            <span className="text-[#828282] font-medium">{data?.refcode}</span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            RRN:
            <span className="text-[#828282] font-medium"> {data?.rrn} </span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Stan:{" "}
            <span className="text-[#828282] font-medium">{data?.stan}</span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Transactingterminalid:
            <span className="text-[#828282] font-medium">
              {" "}
              {data?.transactingterminalid}{" "}
            </span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Route:{" "}
            <span className="text-[#828282] font-medium">{data?.route}</span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            TransactionId:
            <span className="text-[#828282] font-medium">
              {" "}
              {data?.transactionId}
            </span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            TerminalId:{" "}
            <span className="text-[#828282] font-medium">
              {data?.terminalId}
            </span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Source:
            <span className="text-[#828282] font-medium"> {data?.source}</span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            Responsemessage:{" "}
            <span className="text-[#828282] font-medium">
              {data?.responsemessage}
            </span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            CreatedAt:{" "}
            <span className="text-[#828282] font-medium">
              {data?.createdAt}
            </span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            UpdatedAt:{" "}
            <span className="text-[#828282] font-medium">
              {data?.updatedAt}
            </span>
          </h3>
        </div>
        <div className="flex  flex-wrap justify-between mb-3">
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            _V:
            <span className="text-[#828282] font-medium"> {data?.__v}</span>
          </h3>
          <h3 className="text-[#333] font-semibold text-sm w-1/2">
            dateCreated:{" "}
            <span className="text-[#828282] font-medium">
              {data?.dateCreated}
            </span>
          </h3>
        </div>
      </section>
      <a
        className="mb-10 flex w-10/12 mx-auto items-center justify-center gap-2 py-2 px-3 border border-primary bg-[#F2F2F2] text-primary rounded-lg"
        href={`${BASE_URL}/admin/download/transaction/${selectedTransactionId}`}
        target="_blank"
        download="filename.pdf"
      >
        Download PDF
      </a>
    </div>
  );
};

export default TransDetails;
