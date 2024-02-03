"use client";

import { useState } from "react";

import ReactModal from "react-modal";
import NextDownload from "./NextDownload";
import SelectDownload from "./selectDownload";

const Download = ({ setModalIsOpen, modalIsOpen, setSelected, selected , fullData}) => {
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };


  const picked = selected.length > 0
  const [next, setNext] = useState(false);
  const [choice, setChoice ] = useState(false);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      opacity: "1",
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

  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-between pb-3 border-b-2 border-[#828282]">
        <h3 className="text-xl font-semibold">Download File</h3>
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
      <section className="my-14 ">
        <button onClick={() => {setNext(true);}} className="mb-10 flex w-10/12 mx-auto items-center justify-center gap-2 py-2 px-3 border border-primary bg-[#F2F2F2] text-primary rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <g clip-path="url(#clip0_1_2711)">
              <path
                d="M13.5 10H18.5L12.5 16L6.5 10H11.5V3H13.5V10ZM4.5 19H20.5V12H22.5V20C22.5 20.2652 22.3946 20.5196 22.2071 20.7071C22.0196 20.8946 21.7652 21 21.5 21H3.5C3.23478 21 2.98043 20.8946 2.79289 20.7071C2.60536 20.5196 2.5 20.2652 2.5 20V12H4.5V19Z"
                fill="#941D3A"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_2711">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          Download All Records
        </button>
        <button onClick={() => picked && setChoice(true)} className={`flex w-10/12 mx-auto items-center justify-center gap-2 py-2 px-3 border ${picked ? "border-[#941D3A]" : "border-[#bdbdbd]"} bg-[#F2F2F2] ${picked ? "text-[#941D3A]" : "text-[#bdbdbd]"}  rounded-lg`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <g clip-path="url(#clip0_1_2711)">
              <path
                d="M13.5 10H18.5L12.5 16L6.5 10H11.5V3H13.5V10ZM4.5 19H20.5V12H22.5V20C22.5 20.2652 22.3946 20.5196 22.2071 20.7071C22.0196 20.8946 21.7652 21 21.5 21H3.5C3.23478 21 2.98043 20.8946 2.79289 20.7071C2.60536 20.5196 2.5 20.2652 2.5 20V12H4.5V19Z"
                fill={`${picked ? "#941D3A" : "#bdbdbd"}`}
              />
            </g>
            <defs>
              <clipPath id="clip0_1_2711">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          Download Selected Records
        </button>
      </section>
      <ReactModal
        isOpen={next}
        onRequestClose={() => setNext(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
       <NextDownload setModalIsOpen={setNext} modalIsOpen={next} fullData={fullData} />
      </ReactModal >
      <ReactModal
        isOpen={choice}
        onRequestClose={() => setChoice(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
       <SelectDownload setModalIsOpen={setChoice} modalIsOpen={setChoice}  selected={selected}/>
      </ReactModal >
    </div>
  );
};

export default Download;
