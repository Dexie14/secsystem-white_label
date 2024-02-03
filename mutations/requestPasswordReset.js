
import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";

export const requestPasswordReset = async ({
  email,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/forgotpassword`, {
      email,
    });

    if (response?.data?.success !== "error") {
      return {
        success: true,
        data: response.data?.data,
        message: response.data?.message,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error?.message || error?.response?.data?.error || error?.response?.data?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while logging in");
  }
};
