"use client";

import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoutIcon } from "./icons/LogoutIcon";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { useGetAdmin } from "@/hooks/useAdminProfile";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const title = pathname.split("/")[2];

  const pathParts = pathname.split("/");
  const lastPathSegment = pathParts[pathParts.length - 1];

  const handleLogout = () => {
    toast.success("You have successfully Loggedout");
    Cookies.remove("token", " ");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  const { data: admin, isLoading, isError, refetch } = useGetAdmin();

  return (
    <aside className="bg-white min-h-[100vh] w-full relative scrol overflow-y-scroll overflow-hidden">
      <div className="px-6 py-5">
        <section className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Image src={logo} height={28} width={24} alt="logo" />
            <h6
              className="text-xl text-primary"
              style={{ fontFamily: "DMSans" }}
            >
              Bestaf
            </h6>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M17.5001 14.9995V16.6662H2.50008V14.9995H17.5001ZM5.49691 3.25269L6.67542 4.43119L4.02377 7.08284L6.67542 9.7345L5.49691 10.913L1.66675 7.08284L5.49691 3.25269ZM17.5001 9.16617V10.8328H10.0001V9.16617H17.5001ZM17.5001 3.33284V4.99951H10.0001V3.33284H17.5001Z"
              fill="#4B5563"
            />
          </svg>
        </section>
        <section className="py-20">
          <Link href={`/user`} className="">
            <div
              className="flex gap-3 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
              style={{
                background: lastPathSegment === "user" ? "#FFEAEF" : "",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="group"
              >
                <path
                  d="M19 8.71001L13.667 4.56201C13.199 4.19792 12.623 4.00024 12.03 4.00024C11.4371 4.00024 10.861 4.19792 10.393 4.56201L5.05903 8.71001C4.73847 8.9593 4.47912 9.27854 4.30078 9.64336C4.12245 10.0082 4.02984 10.4089 4.03003 10.815V18.015C4.03003 18.5454 4.24074 19.0542 4.61582 19.4292C4.99089 19.8043 5.4996 20.015 6.03003 20.015H18.03C18.5605 20.015 19.0692 19.8043 19.4442 19.4292C19.8193 19.0542 20.03 18.5454 20.03 18.015V10.815C20.03 9.99201 19.65 9.21501 19 8.71001Z"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: lastPathSegment === "user" ? "#941D3A" : "",
                  }}
                />
                <path
                  d="M16 15C13.79 16.333 10.208 16.333 8 15"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: lastPathSegment === "user" ? "#941D3A" : "",
                  }}
                />
              </svg>

              <h5
                className="text-dark group-hover:text-primary text-sm"
                style={{
                  color: lastPathSegment === "user" ? "#941D3A" : "",
                }}
              >
                Dashboard
              </h5>
            </div>
          </Link>
          <Link href={`/user/terminal`} className="">
            <div
              className="flex gap-3 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
              style={{
                background: title === "terminal" ? "#FFEAEF" : "",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="group"
              >
                <path
                  d="M18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5Z"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "terminal" ? "#941D3A" : "",
                  }}
                />
                <path
                  d="M3 10H21"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "terminal" ? "#941D3A" : "",
                  }}
                />
                <path
                  d="M7 15H7.01"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "terminal" ? "#941D3A" : "",
                  }}
                />
                <path
                  d="M11 15H13"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "terminal" ? "#941D3A" : "",
                  }}
                />
              </svg>

              <h5
                className="text-dark group-hover:text-primary text-sm"
                style={{
                  color: title === "terminal" ? "#941D3A" : "",
                }}
              >
                Terminal
              </h5>
            </div>
          </Link>
          <Link href={`/user/transaction`} className="">
            <div
              className="flex gap-3 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
              style={{
                background: title === "transaction" ? "#FFEAEF" : "",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="group"
              >
                <path
                  d="M18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5Z"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "transaction" ? "#941D3A" : "",
                  }}
                />
                <path
                  d="M3 10H21"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "transaction" ? "#941D3A" : "",
                  }}
                />
                <path
                  d="M7 15H7.01"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "transaction" ? "#941D3A" : "",
                  }}
                />
                <path
                  d="M11 15H13"
                  stroke="#4F4F4F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "transaction" ? "#941D3A" : "",
                  }}
                />
              </svg>

              <h5
                className="text-dark group-hover:text-primary text-sm"
                style={{
                  color: title === "transaction" ? "#941D3A" : "",
                }}
              >
                Transaction
              </h5>
            </div>
          </Link>
          {admin?.role === "superadmin" && (
            <Link href={`/user/merchant`} className="">
              <div
                className="flex gap-4 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
                style={{
                  background: title === "merchant" ? "#FFEAEF" : "",
                }}
              >
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="group"
              >
                <path
                  d="M7.50008 2.04825V3.81801C5.05689 4.80699 3.33341 7.20226 3.33341 10.0001C3.33341 13.682 6.31818 16.6667 10.0001 16.6667C12.7979 16.6667 15.1932 14.9432 16.1822 12.5001H17.9519C16.89 15.881 13.7314 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10.0001C1.66675 6.26871 4.11916 3.11014 7.50008 2.04825ZM10.0001 1.66675C14.6024 1.66675 18.3334 5.39771 18.3334 10.0001C18.3334 10.2813 18.3195 10.5593 18.2922 10.8334H9.16675V1.7079C9.44083 1.68068 9.71883 1.66675 10.0001 1.66675ZM10.8334 3.38499V9.16675H16.6152C16.2392 6.15115 13.849 3.76103 10.8334 3.38499Z"
                  fill="#4B5563"
                  className="group-hover:stroke-primary"
                  style={{
                    stroke: title === "merchant" ? "#941D3A" : "",
                  }}
                />
              </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="group"
                >
                  <path
                    d="M7 0C7.98891 0 8.95561 0.293245 9.77785 0.842652C10.6001 1.39206 11.241 2.17295 11.6194 3.08658C11.9978 4.00021 12.0969 5.00555 11.9039 5.97545C11.711 6.94536 11.2348 7.83627 10.5355 8.53553C9.83627 9.2348 8.94536 9.711 7.97545 9.90393C7.00555 10.0969 6.00021 9.99784 5.08658 9.6194C4.17295 9.24096 3.39206 8.6001 2.84265 7.77785C2.29324 6.95561 2 5.98891 2 5L2.005 4.783C2.06092 3.49575 2.61161 2.27978 3.54222 1.38866C4.47284 0.497541 5.71154 7.44425e-05 7 0ZM9 12C10.3261 12 11.5979 12.5268 12.5355 13.4645C13.4732 14.4021 14 15.6739 14 17V18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V17C0 15.6739 0.526784 14.4021 1.46447 13.4645C2.40215 12.5268 3.67392 12 5 12H9Z"
                    fill="#4B5563"
                    className="group-hover:fill-primary"
                    style={{
                      fill: title === "merchant" ? "#941D3A" : "",
                    }}
                  />
                </svg>

                <h5
                  className="text-dark group-hover:text-primary text-sm"
                  style={{
                    color: title === "merchant" ? "#941D3A" : "",
                  }}
                >
                  Merchant
                </h5>
              </div>
            </Link>
          )}
          {admin?.role === "superadmin" && (
            <Link href={`/user/route`} className="">
              <div
                className="flex gap-4 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
                style={{
                  background: title === "route" ? "#FFEAEF" : "",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="group"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.142 4.142C6.904 1.381 8.284 0 10 0C11.716 0 13.096 1.38 15.858 4.142C18.619 6.904 20 8.284 20 10C20 11.716 18.62 13.096 15.858 15.858C13.096 18.619 11.716 20 10 20C8.284 20 6.904 18.62 4.142 15.858C1.381 13.096 0 11.716 0 10C0 8.284 1.38 6.904 4.142 4.142ZM11.846 6.452C11.7741 6.38463 11.6896 6.33209 11.5974 6.29736C11.5052 6.26263 11.4071 6.24641 11.3086 6.24961C11.2101 6.25282 11.1132 6.27539 11.0235 6.31603C10.9337 6.35668 10.8529 6.4146 10.7855 6.4865C10.7181 6.5584 10.6656 6.64286 10.6309 6.73507C10.5961 6.82728 10.5799 6.92542 10.5831 7.0239C10.5863 7.12237 10.6089 7.21925 10.6495 7.30901C10.6902 7.39876 10.7481 7.47963 10.82 7.547L12.103 8.75H8.667C8.112 8.75 7.289 8.9 6.58 9.378C5.832 9.883 5.25 10.735 5.25 12C5.25 12.1989 5.32902 12.3897 5.46967 12.5303C5.61032 12.671 5.80109 12.75 6 12.75C6.19891 12.75 6.38968 12.671 6.53033 12.5303C6.67098 12.3897 6.75 12.1989 6.75 12C6.75 11.265 7.057 10.867 7.42 10.622C7.79288 10.3842 8.22479 10.2554 8.667 10.25H12.103L10.82 11.453C10.6783 11.5899 10.5962 11.777 10.5913 11.9739C10.5864 12.1709 10.6592 12.3618 10.794 12.5055C10.9288 12.6492 11.1146 12.7341 11.3115 12.7419C11.5083 12.7496 11.7003 12.6796 11.846 12.547L14.513 10.047C14.5878 9.97686 14.6474 9.89213 14.6881 9.79804C14.7289 9.70396 14.7499 9.60253 14.7499 9.5C14.7499 9.39747 14.7289 9.29604 14.6881 9.20196C14.6474 9.10787 14.5878 9.02314 14.513 8.953L11.846 6.452Z"
                    fill="#4B5563"
                    className="group-hover:fill-primary"
                    style={{
                      fill: title === "route" ? "#941D3A" : "",
                    }}
                  />
                </svg>

                <h5
                  className="text-dark group-hover:text-primary text-sm"
                  style={{
                    color: title === "route" ? "#941D3A" : "",
                  }}
                >
                  Route
                </h5>
              </div>
            </Link>
          )}
          {admin?.role === "superadmin" && (
            <Link href={`/user/health_report`} className="">
              <div
                className="flex gap-4 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
                style={{
                  background: title === "health_report" ? "#FFEAEF" : "",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="6"
                  viewBox="0 0 18 6"
                  fill="none"
                  className="group"
                >
                  <path
                    d="M0 0H18V2H0V0ZM0 4H14V6H0V4Z"
                    fill="#4B5563"
                    className="group-hover:fill-primary"
                    style={{
                      fill: title === "health_report" ? "#941D3A" : "",
                    }}
                  />
                </svg>

                <h5
                  className="text-dark group-hover:text-primary text-sm"
                  style={{
                    color: title === "health_report" ? "#941D3A" : "",
                  }}
                >
                  Health Report
                </h5>
              </div>
            </Link>
          )}
          {admin?.role === "superadmin" && (
            <Link href={`/user/transaction_report`} className="">
              <div
                className="flex gap-4 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
                style={{
                  background: title === "transaction_report" ? "#FFEAEF" : "",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="6"
                  viewBox="0 0 18 6"
                  fill="none"
                  className="group"
                >
                  <path
                    d="M0 0H18V2H0V0ZM0 4H14V6H0V4Z"
                    fill="#4B5563"
                    className="group-hover:fill-primary"
                    style={{
                      fill: title === "transaction_report" ? "#941D3A" : "",
                    }}
                  />
                </svg>

                <h5
                  className="text-dark group-hover:text-primary text-sm"
                  style={{
                    color: title === "transaction_report" ? "#941D3A" : "",
                  }}
                >
                  Transaction Report
                </h5>
              </div>
            </Link>
          )}
        </section>
        <section className="absolute bottom-5 flex items-end">
          <div
            className="flex gap-3 hover:bg-secondary group rounded-lg px-5 py-2 items-center cursor-pointer mb-[25px]"
            onClick={handleLogout}
          >
            <LogoutIcon />

            <h5 className="text-[#EB5757] group-hover:text-primary text-sm">
              Log out
            </h5>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
