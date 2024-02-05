import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";
// import { useToken } from "@/hooks/auth/useToken";
import toast from 'react-hot-toast';
// import { toast } from "react-toastify";
// const { token } = useToken();

export const createNewMerch = async ({
  name,
  email,
  address,
  selectedColor,
  selectedFile,
  handleCloseModal,
}) => {
  try {

    const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('primaryColor', selectedColor);
      formData.append('image', selectedFile);


    const response = await axios.post(
      `${BASE_URL}/merchant/create`,formData,
      // {
      //   name: name,
      //   email: email,
      //   address: address,
      //   primaryColor: selectedColor,
      //   image: formData
      // },
      {
        headers: {
         'content-type': 'multipart/form-data',
        },
      }
    );
    toast.success(response?.data?.message);
    handleCloseModal();
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.response?.data?.message);
    // handleCloseModal();
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while creating merch");
  }
};
