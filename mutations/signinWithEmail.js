
import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
// import toast from 'react-hot-toast'


export const signinWithEmail = async ({
  email,
  password,
}) => {
  try {
    const response  = await axios.post(
      `${BASE_URL}/admin/login`,
      {
        email,
        password,
      }
    );
    if (response?.data?.status !== "error") {
      // localStorage.setItem("token", response?.data?.data);
      Cookies.set("token", response?.data?.data)
      return { success: true, data: response?.data?.message };
    } else {
      throw new Error(response?.data?.message);
    } 
  
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.response?.data?.message );
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error || error?.response?.data?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while logging in");
  }
};
