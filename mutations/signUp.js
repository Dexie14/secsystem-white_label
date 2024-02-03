import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";

export const signUp = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/create`, {
      name,
      email,
      password,
    });
  } catch (error) {
    // toast.error(error?.response?.data?.error || error?.response?.data?.message );
    if (error instanceof AxiosError) {
      throw new Error(error?.data?.message || error?.response?.data?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while creating account");
  }
};
