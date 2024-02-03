"use client";
import { useState } from "react";

import ReactModal from "react-modal";
import OtpCongrats from "./OtpCongrats";
import Button from "../Comps/Button";

const Signin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      opacity: "10",
    },
    content: {
      height: "60vh",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto",
      borderRadius: "30px",
      width: "40%",
    },
  };

  return (
    <section>
      <div className="pt-10">
        {/* <div className="flex justify-center gap-3 items-center">
          <Image src={logo} height={28} width={24} alt="logo" />
          <h6 className="text-xl text-primary" style={{ fontFamily: "DMSans" }}>
            Bestaf
          </h6>
        </div> */}
        <h3
          className="mt-5 flex justify-center text-2xl font-medium"
          onClick={() => setIsOpen(true)}
        >
          Welcome, Fill in your details to register as Users
        </h3>

        <form
          className="bg-white rounded-3xl px-10 py-10 w-1/2 mx-auto my-10"
          style={{ boxShadow: "0px 2px 14px 0px rgba(51, 51, 51, 0.15);" }}
        >
          <div className="mb-5 flex flex-col">
            <label htmlFor="name" className="font-semibold text-[#333333] mb-1">
              Full Name
            </label>
            <input
              className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
              type="text"
              placeholder="Enter your name"
              id="name"
            />
          </div>
          <div className="mb-5 flex flex-col">
            <label
              htmlFor="email"
              className="font-semibold text-[#333333] mb-1"
            >
              Email
            </label>
            <input
              className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
              type="email"
              placeholder="Enter your email"
              id="email"
            />
          </div>
          <div className="mb-5 flex flex-col">
            <label
              htmlFor="number"
              className="font-semibold text-[#333333] mb-1"
            >
              Phone Number
            </label>
            <input
              className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
              type="tel"
              placeholder="Enter your phone number"
              id="number"
            />
          </div>
          <div className="mb-5 flex flex-col">
            <label
              htmlFor="password"
              className="font-semibold text-[#333333] mb-1"
            >
              Password
            </label>
            <input
              className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <div>
            <button className="bg-primary text-white flex justify-center items-center w-full rounded-lg px-3 py-3">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <OtpCongrats setModalIsOpen={setIsOpen} modalIsOpen={isOpen} />
      </ReactModal>
    </section>
  );
};

export default Signin;
