import { useState } from "react";
import Button from "../Comps/Button";

import { useDeleteMerch } from "@/hooks/useDeleteMerch";

const DeleteMerch = ({ setModalIsOpen, modalIsOpen, refetch }) => {
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const [theMerchId, setTheMerchId] = useState("");

  const { mutate: deleting, isPending } = useDeleteMerch();

  const createDelete = () => {
    deleting({ theMerchId, handleCloseModal, refetch });
  };

  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-between pb-3 border-b-2 border-[#828282]">
        <h3 className="text-xl font-semibold">Delete Merchant </h3>
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
      <h3 className="text-sm text-center font-medium mt-3">
        Deleting this merchant id implies all the terminal Id associated with
        that merchant will also be deleted
      </h3>

      <section className="mb-10 mt-5">
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="name"
            className=" text-sm font-normal text-[#333333] mb-1"
          >
            Please confirm you want to delete merchant by inputing the actual
            Merchant Id
          </label>
          <input
            onChange={(e) => setTheMerchId(e.target.value)}
            id="name"
            // value={name}
            className="text-sm rounded-lg px-3 bg-[#f2f2f2] py-3 border border-border placeholder:text-border"
            type="text"
            placeholder="Enter Merchant Id "
          />
        </div>

        <Button onClick={createDelete} className="w-full px-3 py-2">
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </section>
    </div>
  );
};

export default DeleteMerch;
