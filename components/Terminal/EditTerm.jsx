import { useState } from "react";
import Button from "../Comps/Button";

import { useEditDetails } from "@/hooks/useEditDetails";


const EditTerm = ({ setModalIsOpen, modalIsOpen, prevData, refetch }) => {
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const [name, setName] = useState(prevData?.merchantName);
  const [address, setAddress] = useState(prevData?.address);
  const [supportNumber, setSupportNumber] = useState(prevData?.supportNumber);
  const [receiptNum, setReceiptNum] = useState(prevData?.NumberOfReciepts);
  const [print, setPrint] = useState("");
  const [acc, setAcc] = useState("");
  const [enabling, setEnabling] = useState(false);

  const value = prevData?.terminalId


  const { mutate: update, isPending } = useEditDetails();

  const createUpdate = () => {
    update({ name, address, supportNumber,receiptNum,print, acc,enabling, handleCloseModal,value , refetch});
  };

  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-between pb-3 border-b-2 border-[#828282]">
        <h3 className="text-xl font-semibold">Edit your details</h3>
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
      <section className="my-10">
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="name"
            className=" text-sm font-semibold text-[#333333] mb-1"
          >
            Merchant Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            defaultValue={prevData?.merchantName}
            // value={name}
            className="text-sm rounded-lg px-3 bg-[#f2f2f2] py-3 border border-border placeholder:text-border"
            type="text"
            placeholder="Enter Merchant Name"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="address"
            className="font-semibold text-[#333333] mb-1 text-sm "
          >
            Address of location
          </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            // value={address}
            defaultValue={prevData?.address}
            className="text-sm rounded-lg bg-[#f2f2f2] px-3 py-3 border border-border placeholder:text-border"
            type="text"
            placeholder="Enter Address"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="support"
            className="text-sm  font-semibold text-[#333333] mb-1"
          >
            Support Number
          </label>
          <input
            onChange={(e) => setSupportNumber(e.target.value)}
            id="support"
            // value={supportNumber}
            defaultValue={prevData?.supportNumber}
            className="text-sm rounded-lg px-3 py-3 bg-[#f2f2f2] border border-border placeholder:text-border"
            type="text"
            placeholder="Enter Support Number"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="receipt"
            className="text-sm  font-semibold text-[#333333] mb-1"
          >
            Receipt Number
          </label>
          <input
            onChange={(e) => setReceiptNum(e.target.value)}
            id="receipt"
            // value={receiptNum}
            defaultValue={prevData?.NumberOfReciepts}
            className="text-sm rounded-lg px-3 py-3 bg-[#f2f2f2] border border-border placeholder:text-border"
            type="number"
            placeholder="Enter Number of Receipt"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label
            className="text-sm  font-semibold text-[#333333] mb-1"
          >
            Print Receipt
          </label>
          <select onChange={(e) => setPrint(e.target.value.toLowerCase() === 'true')} className="text-sm rounded-lg px-3 py-3 bg-[#f2f2f2] border border-border outline-none">
            <option selected disabled>
              Select Action 
            </option>
            <option>True</option>
            <option>False</option>
          </select>
        </div>
        <div className="mb-5 flex flex-col">
          <label
            className="text-sm  font-semibold text-[#333333] mb-1"
          >
            Account Selection
          </label>
          <select onChange={(e) => setAcc(e.target.value.toLowerCase() === 'true')} className=" text-sm rounded-lg px-3 py-3 bg-[#f2f2f2] border border-border outline-none">
            <option selected disabled>
              Select Action 
            </option>
            <option>True</option>
            <option>False</option>
          </select>
        </div>
        <div className="mb-5 flex flex-col">
          <label
            className="text-sm  font-semibold text-[#333333] mb-1"
          >
            isEnabled?
          </label>
          <select onChange={(e) =>  setEnabling(e.target.value.toLowerCase() === 'true')} className=" text-sm rounded-lg px-3 py-3 bg-[#f2f2f2] border border-border outline-none">
            <option selected disabled>
              Select Action 
            </option>
            <option>True</option>
            <option>False</option>
          </select>
        </div>
       
        <Button onClick={createUpdate} className="w-full px-3 py-2">
          {" "}
          {isPending ? "updating" : "Update"}{" "}
        </Button>
      </section>
    </div>
  );
};

export default EditTerm;
