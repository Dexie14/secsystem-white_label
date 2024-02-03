import Cookies from "js-cookie";

export const useToken = () => {
  const token = Cookies.get("token");

  return { token };
};
// export const useToken = () => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   return { token };
// };
