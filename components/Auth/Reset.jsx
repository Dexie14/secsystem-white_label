"use client"

import { useRequestPasswordReset } from "@/hooks/auth/useRequestPasswordReset";
import { resetPasswordSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../Spinner";
import ReactModal from "react-modal";
import ResetCongrats from "./resetCongrats";

import { toast } from "react-toastify";

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

const Reset = () => {
  const router = useRouter();

  
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    mode: "all",
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutate: requestPasswordReset, isPending } = useRequestPasswordReset();

  const handleRequestPasswordReset = useCallback(
    (values) => {
      requestPasswordReset(values, {
        onError: (error) => {
          toast.error(error?.message);
        },
        onSuccess: (response) => {
          toast.success(response?.message);
          setIsOpen(true)
        },
      });
    },
    [requestPasswordReset]
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  return (
    <div className="pt-10">
      <h3 className="mt-14 flex justify-center text-2xl font-medium">
        Enter your email to reset password
      </h3>
      <form
        className="bg-white rounded-3xl px-10 py-10 w-5/12 mx-auto my-10"
        style={{ boxShadow: "0px 2px 14px 0px rgba(51, 51, 51, 0.15);" }}
        onSubmit={handleSubmit(handleRequestPasswordReset)}
      >
        <div className="mb-5 flex flex-col">
          <label htmlFor="email" className="font-semibold text-[#333333] mb-1">
            Email
          </label>
          <input
            className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors?.email && (
            <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                !
              </div>
              <p>{errors?.email?.message}</p>
            </div>
          )}
        </div>

        <div className="mb-10 mt-5">
          <button type="submit" className="bg-primary text-white flex justify-center items-center w-full rounded-lg px-3 py-3">
            {isPending ? <Spinner /> : "Send Reset Link"}
          </button>
        </div>
      </form>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <ResetCongrats setModalIsOpen={setIsOpen} modalIsOpen={isOpen} />
      </ReactModal>
    </div>
  );
};

export default Reset;
