import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";

import { toast } from "react-toastify";
const { token } = useToken();

export const createUpload = async ({formData, handleCloseModal}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/upload/bulk`,formData,
      {
        headers: {
         'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response?.data?.message);
    handleCloseModal();
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.response?.data?.message);
    handleCloseModal();
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while uploading");
  }
};
