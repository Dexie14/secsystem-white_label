"use client";
import { useCallback, useState } from "react";

import ReactModal from "react-modal";
import OtpCongrats from "./OtpCongrats";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/models/auth";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { toast } from "react-toastify";
import { Spinner } from "../Spinner";

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

const Register = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      phoneno: "",
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(signUpSchema),
  });

  const { mutate: signUpUser, isPending } = useSignUp();

  const handleSignUp = useCallback(
    (values) => {
      signUpUser(values, {
        onError: (error) => {
          if (error instanceof Error) {
            console.log(error);
            toast.error(error?.message);
          }
        },
        onSuccess: (response) => {
          console.log(response?.data);
          toast.success(response?.data?.message);
          setIsOpen(true)
        },
      });
    },
    [signUpUser]
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

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
          onSubmit={handleSubmit(handleSignUp)}
          className="bg-white rounded-3xl px-10 py-10 w-1/2 mx-auto my-10"
          style={{ boxShadow: "0px 2px 14px 0px rgba(51, 51, 51, 0.15);" }}
        >
          <div className="mb-5 flex flex-col">
            <label className="font-semibold text-[#333333] mb-1">
              Full Name
            </label>
            <input
              className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors?.name && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.name?.message}</p>
              </div>
            )}
          </div>
          <div className="mb-5 flex flex-col">
            <label className="font-semibold text-[#333333] mb-1">Email</label>
            <input
              className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
              type="email"
              placeholder="Enter your email"
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
          <div className="mb-5 flex flex-col">
            <label className="font-semibold text-[#333333] mb-1">
              Phone Number
            </label>
            <input
              className="rounded-lg px-3 py-3 border border-border placeholder:text-border"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneno")}
            />
            {errors?.phoneno && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.phoneno?.message}</p>
              </div>
            )}
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
              {...register("password")}
            />
            {errors?.password && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.password?.message}</p>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white flex justify-center items-center w-full rounded-lg px-3 py-3"
            >
              {isPending ? <Spinner /> : "Sign Up"}
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

export default Register;
