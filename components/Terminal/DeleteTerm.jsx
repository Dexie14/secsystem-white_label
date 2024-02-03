import { useState } from "react";
import Button from "../Comps/Button";

import { useDeleteTerm } from "@/hooks/useDeleteTerm";

const DeleteTerm = ({ setModalIsOpen, modalIsOpen, refetch }) => {
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const [theTermId, setTheTermId] = useState("");

  const { mutate: deleting, isPending } = useDeleteTerm();

  const createDelete = () => {
    deleting({ theTermId, handleCloseModal, refetch });
  };

  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-between pb-3 border-b-2 border-[#828282]">
        <h3 className="text-xl font-semibold">Delete Terminal </h3>
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
            Please confirm you want to delete terminal by inputing the actual
            Terminal Id
          </label>
          <input
            onChange={(e) => setTheTermId(e.target.value)}
            id="name"
            // value={name}
            className="text-sm rounded-lg px-3 bg-[#f2f2f2] py-3 border border-border placeholder:text-border"
            type="text"
            placeholder="Enter Terminal Id "
          />
        </div>

        <Button onClick={createDelete} className="w-full px-3 py-2">
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </section>
    </div>
  );
};

export default DeleteTerm;
