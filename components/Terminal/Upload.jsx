"use client";

import { useState } from "react";

import { useCreateUploading } from "@/hooks/useUpload";

const Upload = ({ setModalIsOpen, selectedFile, handleDelete }) => {
    const handleCloseModal = () => {
      setModalIsOpen(false);
    };

  const formData = new FormData();
  formData.append('file', selectedFile);


  const { mutate: upload, isPending } = useCreateUploading();

  const createUpload = () => {
    upload({formData, handleCloseModal});
  };

  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-between pb-3 border-b-2 border-[#828282]">
        <h3 className="text-xl font-semibold">Uploaded File</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          className="cursor-pointer"
          onClick={handleDelete}
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
      <section className="my-14 ">
        <div className="flex  gap-2 items-center justify-center my-3">
          <p className="">File uploaded: {selectedFile.name}</p>
          <button
            className="flex items-center justify-center py-1 px-2 border border-border bg-white text-dark rounded-lg"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
              />
            </svg>
          </button>
        </div>
        <button onClick={createUpload} className="mb-10 flex w-10/12 mx-auto items-center justify-center gap-2 py-2 px-3 border border-primary bg-[#F2F2F2] text-primary rounded-lg">
          {isPending ? "submitting" : "Submit Upload"}
        </button>
      </section>
    </div>
  );
};

export default Upload;
