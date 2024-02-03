import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { toast } from "react-toastify";
const { token } = useToken();

export const settingRoute = async ({
    identify,
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/set`,
      {
        identifier: identify,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response?.data?.message?.message);
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.response?.data?.message);
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while setting");
  }
  refetch()
};
