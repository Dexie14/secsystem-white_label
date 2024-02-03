import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { toast } from "react-toastify";
const { token } = useToken();

export const resendOtp = async ({
  decodedEmail,
  setCountdown,
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/resend/verification`,
      {
        email: decodedEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response?.data?.message);
    if (response?.data?.status !== "error") {
      setCountdown(120);
      return { success: true, data: response?.data?.message };
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.response?.data?.message || error?.response?.data?.status);
    setCountdown(120);
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while re-sending an otp");
  }
};
