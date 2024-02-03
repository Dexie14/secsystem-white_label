import { useGetTrans } from "@/hooks/auth/useGetTrans";
import { Spinner } from "../Spinner";
import moment from "moment";

const Table = () => {
  const { data: transactions, isLoading, isError } = useGetTrans();


  return (
    <div>
      <table className=" w-full table-auto tabling">
        <thead className="text-left mb-3 border-b-4">
          <tr className="bg-secondary px-3">
            {/* <th className="py-4 pl-2">
              <input type="checkbox" />
            </th> */}
            <th className=" py-4 pl-2 text-sm font-semibold text-[#333333]">
              Terminal ID
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Transaction ID
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Created Date
            </th>
            <th className=" text-sm font-semibold text-[#333333]">Amount</th>
            <th className=" text-sm font-semibold text-[#333333]">Status</th>
          </tr>
        </thead>
        {isLoading ? (
          <Spinner />
        ) : transactions ? (
          <tbody className="bg-white cursor-pointer ">
            {Array.isArray(transactions?.items) &&
            transactions?.items?.length >= 0 ? (
              transactions?.items?.map((item, index) => (
                <tr
                  className="bg-white border-b-4"
                  style={{
                    boxShadow: "0px 2px 2px 0px rgba(34, 34, 34, 0.10);",
                  }}
                  key={index}
                >
                  {/* <td className="pl-2">
                      <input type="checkbox" />
                    </td> */}
                  <td className="pl-2 text-sm font-normal text-[#333333] py-4">
                    {item?.terminalId}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.transactionId}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    ₦
                    {item?.amount?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  {item?.responsemessage === "success" ? (
                    <td
                      onClick={() => {
                        setSelectedTransactionId(item?.transactionId); // Assuming `id` is the property holding the transaction ID
                        setIsOpen(true);
                      }}
                      className="flex gap-1 text-sm font-normal px-2 text-[#333333]  bg-[#EDFFEA] w-fit mt-3 justify-center items-center rounded"
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
                      {item?.responsemessage}
                    </td>
                  ) : item?.responsemessage === "failed" ? (
                    <td
                      onClick={() => {
                        setSelectedTransactionId(item?.transactionId); // Assuming `id` is the property holding the transaction ID
                        setIsOpen(true);
                      }}
                      className="flex gap-1 text-sm font-normal px-2 text-[#333333]  bg-[#FFEAEA] w-fit  mt-3 justify-center items-center rounded"
                    >
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
                    <td
                      onClick={() => {
                        setSelectedTransactionId(item?.transactionId); // Assuming `id` is the property holding the transaction ID
                        setIsOpen(true);
                      }}
                      className="flex gap-1 text-sm font-normal px-2 text-[#333333]  w-fit  mt-3 justify-center items-center rounded"
                    >
                      {item?.responsemessage}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <p className="my-10 text-center ">No data available</p>
            )}
          </tbody>
        ) : (
          <p>no data available</p>
        )}
        {/* <tbody className="bg-white  " >
          <tr lassName="bg-white  border-b-4" style={{boxShadow:"0px 2px 2px 0px rgba(34, 34, 34, 0.10);"}}>
            <td className="pl-2">
            <input type="checkbox"/>
            </td>
            <td className="text-sm font-normal text-[#333333] py-4">
              20A1B2C3
            </td>
            <td className="text-sm font-normal text-[#333333]">
              Segun Adebayo
            </td>
            <td className="text-sm font-normal text-[#333333]">6767667</td>
            <td className="text-sm font-normal text-[#333333]">
              Mar 23, 2023, 13:00 PM
            </td>
            <td className="text-sm font-normal text-[#333333]">#6000</td>
            <td className="flex gap-1 text-sm font-normal text-[#333333] bg-[#EDFFEA] w-fit px-1 mt-3 justify-center items-center rounded">
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
            </td>
            <td className="text-sm font-normal text-[#333333] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
                  fill="#4F4F4F"
                />
              </svg>
            </td>
          </tr>
        </tbody> */}
      </table>
    </div>
  );
};

export default Table;
