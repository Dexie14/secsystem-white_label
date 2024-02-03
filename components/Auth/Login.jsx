"use client";

import * as React from 'react';
import toast from 'react-hot-toast';
import { useEmailSignin } from "@/hooks/auth/useEmailSignin";
import { signInSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import { Spinner } from "../Spinner";
import { useRouter } from "next/navigation";
import Buttons from "../Comps/Button";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import ReactModal from "react-modal";
import CreateMerch from "./createMerch";
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    opacity: "10",
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

const Login = () => {
  const router = useRouter();
  const [active, setActive] = useState("super");
  const [isOpen, setIsOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [msg, setMsg] = useState('');

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(signInSchema),
  });

  const { mutate: loginWithEmail, isPending } = useEmailSignin();

  const handleSignin = useCallback(
    (values) => {
      loginWithEmail(values, {
        onError: (error) => {
          toast.error(error?.message || "error");
          setOpens(true)
          setMsg(error?.message || "error")
        },
        onSuccess: (response) => {
          console.log(response?.data);
          toast.success(response?.data);
          setOpens(true)
          setMsg(response?.data)
          router.push("/user");
        },
      });
    },
    [loginWithEmail]
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpens(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="pt-10">
        <Snackbar
        open={opens}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
      <h3 className="mt-2 flex justify-center text-2xl font-medium">
        Welcome Admin, Log in now
      </h3>

      <section className="bg-white flex w-4/12 mx-auto my-5">
        <h5
          className={`${
            active === "super"
              ? "text-white bg-primary"
              : "text-[#828282] bg-white"
          } flex justify-center px-7 py-3 w-1/2 cursor-pointer text-2xl`}
          onClick={() => setActive("super")}
        >
          Super Admin
        </h5>
        <h5
          className={`${
            active === "user"
              ? "text-white bg-primary"
              : "text-[#828282] bg-white"
          } flex justify-center px-7 py-3 w-1/2 cursor-pointer text-2xl`}
          onClick={() => setActive("user")}
        >
          Users
        </h5>
      </section>
      <Buttons    onClick={() => setIsOpen(true)} className="text-white bg-primary flex justify-center px-3 py-1 w-[15%] mx-auto cursor-pointer text-sm">
        Create Merchant
      </Buttons>

      {active === "user" ? (
        <form
          className="bg-white rounded-3xl px-10 py-5 w-5/12 mx-auto my-10"
          style={{ boxShadow: "0px 2px 14px 0px rgba(51, 51, 51, 0.15);" }}
          onSubmit={handleSubmit(handleSignin)}
        >
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

          <div className="mb-5 flex flex-col">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="font-semibold text-[#333333] mb-1"
              >
                Password
              </label>
              <label className="font-semibold text-primary mb-1">
                <Link href={`/forgotpassword`}>Forgot Password</Link>
              </label>
            </div>
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
            <button className="bg-primary text-white flex justify-center items-center w-full rounded-lg px-3 py-3">
              {isPending ? <Spinner /> : "Sign In"}
            </button>
          </div>
        </form>
      ) : (
        <form
          className="bg-white rounded-3xl px-10 py-5 w-5/12 mx-auto my-10"
          style={{ boxShadow: "0px 2px 14px 0px rgba(51, 51, 51, 0.15);" }}
          onSubmit={handleSubmit(handleSignin)}
        >
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
            <button className="bg-primary text-white flex justify-center items-center w-full rounded-lg px-3 py-3">
              {isPending ? <Spinner /> : "Sign In"}
            </button>
          </div>
        </form>
      )}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={"h-full left-0 bg-[#0000009b] z-[99999]"}
        style={customStyles}
      >
        <CreateMerch setModalIsOpen={setIsOpen} modalIsOpen={isOpen} />
      </ReactModal>
    </div>
  );
};

export default Login;
