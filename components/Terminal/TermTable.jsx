import { useGetTerminal } from "@/hooks/auth/useGetTerm";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseUrl";
import moment from "moment";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { useGetAdmin } from "@/hooks/useAdminProfile";

import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import Download from "./Download";
import Button from "../Comps/Button";
import EditTerm from "./EditTerm";
import GenTermId from "./GenTermId";
import DeleteTerm from "./DeleteTerm";
const { token } = useToken();

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

const TermTable = ({
  paramlist,
  setDownload,
  download,
  setGenerate,
  generate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevData, setPrevData] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [popups, setPopups] = useState({});

  const handleTogglePopup = (id) => {
    setPopups((prevPopups) => ({
      ...prevPopups,
      [id]: !prevPopups[id],
    }));
  };

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  const param = {
    terminalId: paramlist?.inputTerminal,
    merchantId: paramlist?.inputMerchId,
    merchantName: paramlist?.selectedName,
    serialNumber: "",
    from: paramlist?.fromDate,
    to: paramlist?.toDate,
    pageSize: pageSize,
    page: page,
    enable: false,
  };
  const para = {
    terminalId: paramlist?.inputTerminal,
    merchantId: paramlist?.inputMerchId,
    merchantName: paramlist?.selectedName,
    from: paramlist?.fromDate,
    to: paramlist?.toDate,
    download: true,
    enable: false,
  };

  const getTerminal = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/terminals`, {
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
    data: table,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["term"],
    queryFn: () => getTerminal(),
    cacheTime: 0,
    staleTime: 0,
  });

  const getDown = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/terminals`, {
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

  const totalPages = Math.ceil(table?.totalCount / pageSize);

  const [selected, setSelected] = useState([]);

  // Function to handle the click event on the checkbox
  const handleCheckboxClick = (item) => {
    // Check if the item is already in the selected array
    const isSelected = selected.some(
      (selectedItem) => selectedItem._id === item._id
    );

    // If it's selected, remove it; otherwise, add it to the array
    setSelected((prevSelected) =>
      isSelected
        ? prevSelected.filter((selectedItem) => selectedItem._id !== item._id)
        : [...prevSelected, item]
    );
  };

  // const [option, setOption] = useState("Enable");

  const enabling = async (TID) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/terminal/disable/${TID}`,
        "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.message.includes("enable")) {
        toast.success(response?.data?.message);
        // setOption("Disable");
      } else {
        toast.success(response?.data?.message);
        // setOption("Enable");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || error?.response?.data?.message
      );
      if (error instanceof AxiosError) {
        throw new Error(error?.response?.data?.error?.message);
      } else if (error instanceof Error) {
        throw error;
      } else throw new Error("Error occurred");
    }

    refetch();
  };



  const { data: admin } = useGetAdmin();

  return (
    <div className="">
      <table className=" w-full table-auto tabling">
        <thead className="text-left mb-3 border-b-4">
          <tr className="bg-secondary px-3">
            <th className="py-4 pl-2 ">{/* <input type="checkbox" /> */}</th>
            <th className="py-4 pl-2 text-sm font-semibold text-[#333333]">
              Terminal ID
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Merchant ID
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Merchant Name
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Support Number
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Created Date
            </th>
            <th className=" text-sm font-semibold text-[#333333]">isEnabled</th>
            <th className=" text-sm font-semibold text-[#333333]">Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <Spinner />
        ) : table ? (
          <tbody className="bg-white cursor-pointer  ">
            {Array.isArray(table?.items) && table?.items?.length > 0 ? (
              table?.items?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b-4"
                  style={{
                    boxShadow: "0px 2px 2px 0px rgba(34, 34, 34, 0.10);",
                  }}
                >
                  <td className="pl-2">
                    <input
                      type="checkbox"
                      checked={selected.some(
                        (selectedItem) => selectedItem._id === item._id
                      )}
                      onChange={() => handleCheckboxClick(item)}
                    />
                  </td>
                  <td className="pl-2 text-sm font-normal text-[#333333] py-4">
                    {item?.terminalId}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.merchantId}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.merchantName}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.supportNumber}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                  </td>
                  <td
                    className={`text-sm font-normal text-[#333333] flex gap-1 px-2  w-fit  mt-3 justify-center items-center rounded ${
                      item?.isEnabled === true
                        ? " bg-[#EDFFEA]"
                        : "bg-[#FFEAEA]"
                    }`}
                  >
                    {item?.isEnabled === true ? "True" : "False"}
                  </td>

                  <td
                    className="relative text-sm font-normal text-[#333333] "
                    onClick={() => handleTogglePopup(item?._id)}
                  >
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

                    {popups[item?._id] && (
                      <div className="absolute top-[-15%] right-[100%] rounded bg-white p-2 w-[100px] border border-border z-[100]">
                        <Button
                          onClick={() => {
                            setIsOpen(!isOpen);
                            setPrevData(item);
                          }}
                          className="w-full mb-2"
                        >
                          Edit
                        </Button>

                        <Button
                          className="w-full mb-2"
                          onClick={() => enabling(item?.terminalId)}
                        >
                          {item?.isEnabled === true ? "Disable" : "Enable"}
                        </Button>
                        {admin?.role === "superadmin" && (
                          <Button
                            onClick={() => {
                              setIsDelete(!isDelete);
                            }}
                            className="w-full mb-2 bg-red-600"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    )}
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
          { length: Math.ceil(table?.totalCount / pageSize) },
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
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <EditTerm
          setModalIsOpen={setIsOpen}
          modalIsOpen={isOpen}
          prevData={prevData}
          refetch={refetch}
        />
      </ReactModal>
      <ReactModal
        isOpen={isDelete}
        onRequestClose={() => setIsDelete(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <DeleteTerm
          setModalIsOpen={setIsDelete}
          modalIsOpen={isDelete}
          refetch={refetch}
        />
      </ReactModal>
      <ReactModal
        isOpen={generate}
        onRequestClose={() => setGenerate(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <GenTermId
          setModalIsOpen={setGenerate}
          modalIsOpen={generate}
          refetch={refetch}
        />
      </ReactModal>
    </div>
  );
};

export default TermTable;
