"use client";

import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import classes from "./auth.module.css";
import ReactModal from "react-modal";
import OtpSuccess from "./OtpSuccess";
import { useVerifyAccount } from "@/hooks/auth/useVerifyOtp";
import { useResendAccount } from "@/hooks/auth/useResendOtp";

import { useSearchParams } from "next/navigation";

const VerifyOTP = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [otpValues, setOtpValues] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [textColor, setTextColor] = useState("text-primary");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setTextColor("text-dark");
    }
  }, [countdown]);

  const formattedTime = `${Math.floor(countdown / 60)}:${(
    countdown % 60
  ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}`;

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

  const searchParams = useSearchParams();

  const url = `${searchParams}`;

  const email = url.split("=")[1];
  const decodedEmail = decodeURIComponent(email);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const { mutate: VerifyAdmin, isPending } = useVerifyAccount();
  const { mutate: ResendAdmin } = useResendAccount();

  const createVerification = () => {
    VerifyAdmin({ otpValues, decodedEmail, handleOpenModal });
  };
  const resendVerification = () => {
    ResendAdmin({ decodedEmail, setCountdown });
  };

  const handleResendClick = () => {
    resendVerification();
  };

  return (
    <div className="pt-10">
      <h3 className="mt-5 flex justify-center text-2xl font-medium ">
        Please enter the OTP sent to your email
      </h3>
      <section
        className="bg-white py-8 px-6 rounded-3xl w-5/12 mx-auto my-5"
        style={{ boxShadow: "0px 2px 14px 0px rgba(51, 51, 51, 0.15)" }}
      >
        <div className="flex justify-center">
          <OtpInput
            value={otpValues}
            onChange={setOtpValues}
            numInputs={6}
            renderSeparator={<span></span>}
            inputStyle={`bg-white ${classes.otpInputs} font-bold text-2xl rounded-[8px] h-[48px] border border-[#BDBDBD]  outline-none  m-[10px]`}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <div className="flex gap-2 my-2 items-center justify-center">
          <h6 className={`text-sm mr-2 ${textColor}`}>{formattedTime}</h6>
          {countdown === 0  && (
            <>
              <p className="text-xs text-[#333]">Didn’t receive the OTP?</p>
              <h6
                onClick={handleResendClick}
                className="text-[#828282] text-sm cursor-pointer"
              >
                RESEND
              </h6>
            </>
          )}
        </div>
        <button
          onClick={createVerification}
          className="bg-primary text-white flex justify-center items-center w-9/12  mx-auto rounded-lg px-3 py-3 my-7"
        >
          {isPending ? "Verifying" : "Verify"}
        </button>
      </section>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <OtpSuccess setModalIsOpen={setIsOpen} modalIsOpen={isOpen} />
      </ReactModal>
    </div>
  );
};

export default VerifyOTP;
