import { useState } from "react";
import Button from "../Comps/Button";

import { useCreateMerch } from "@/hooks/useCreateMerch";


const CreateMerch = ({ setModalIsOpen, modalIsOpen }) => {
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");


  const { mutate: createMerch, isPending } = useCreateMerch();

  const createMerchNow = () => {
    createMerch({ name, email, address, handleCloseModal });
  };

  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-between pb-3 border-b-2 border-[#828282]">
        <h3 className="text-xl font-semibold">Generate Merchant's Detail</h3>
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
            className="text-sm rounded-lg px-3 bg-[#f2f2f2] py-3 border border-border placeholder:text-border"
            type="text"
            placeholder="Enter Merchant Name"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="email"
            className="text-sm  font-semibold text-[#333333] mb-1"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="text-sm rounded-lg px-3 py-3 bg-[#f2f2f2] border border-border placeholder:text-border"
            type="email"
            placeholder="Enter Email"
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
            className="text-sm rounded-lg bg-[#f2f2f2] px-3 py-3 border border-border placeholder:text-border"
            type="text"
            placeholder="Enter Address"
          />
        </div>
       
        <Button onClick={createMerchNow} className="w-full px-3 py-2">
          {" "}
          {isPending ? "Generating" : "Generate"}{" "}
        </Button>
      </section>
    </div>
  );
};

export default CreateMerch;
