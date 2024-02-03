"use client";

import React, { useState } from "react";

import { useSearchParams } from "next/navigation";

import { useResetPassword } from "@/hooks/auth/useResetPass";
import ResetSuccess from "./resetSuccess";
import ReactModal from "react-modal";
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

const SavePass = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    updatePasswordsMatch(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    updatePasswordsMatch(password, newConfirmPassword);
  };

  const updatePasswordsMatch = (newPassword, newConfirmPassword) => {
    if (newPassword === newConfirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const searchParams = useSearchParams();
  const url = `${searchParams}`;

  const tok = url.split("=")[1]

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const { mutate: resetting, isPending } = useResetPassword();

  const createNewPassword = () => {
    resetting({ tok, password, handleOpenModal });
  };

  return (
    <div className="pt-10">
      <h3 className="mt-14 flex justify-center text-2xl font-medium">
        Enter your email to reset password
      </h3>
      <section
        className="bg-white rounded-3xl px-10 py-10 w-5/12 mx-auto my-10"
        style={{ boxShadow: "0px 2px 14px 0px rgba(51, 51, 51, 0.15);" }}
      >
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="newpassword"
            className="font-semibold text-[#333333] mb-1"
          >
            New Password
          </label>
          <input
            className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
            type="password"
            placeholder="Password"
            id="newpassword"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label
            htmlFor="confirmpassword"
            className="font-semibold text-[#333333] mb-1"
          >
            Confirm New Password
          </label>
          <input
            className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
            type="password"
            placeholder="Password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {passwordsMatch ? null : (
          <p style={{ color: "red" }}>Passwords do not match.</p>
        )}

        <div className="mb-10 mt-5">
          <button
            onClick={createNewPassword}
            className="bg-primary text-white flex justify-center items-center w-full rounded-lg px-3 py-3"
          >
            {isPending ? "Saving" : "Save"}
          </button>
        </div>
      </section>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <ResetSuccess setModalIsOpen={setIsOpen} modalIsOpen={isOpen} />
      </ReactModal>
    </div>
  );
};

export default SavePass;
