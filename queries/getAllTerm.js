import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { toast } from "react-toastify";
const { token } = useToken();



export const getTerminal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/terminals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.status === "success") {
      return response?.data?.data;
    } else {
      throw new Error(response.data?.data?.message);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred");
  }
};
