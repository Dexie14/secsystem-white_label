import Image from "next/image";
import success from "@/public/assets/auth/success.svg";
import { useRouter } from "next/navigation";

const OtpSuccess = ({ setModalIsOpen, modalIsOpen }) => {


    const router = useRouter();


  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="py-4 px-6 rounded-[40px] ">
      <section className="flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          className="cursor-pointer"
          onClick={handleCloseModal}
        >
          <g clip-path="url(#clip0_2_4170)">
            <path
              d="M15 13.2324L21.1875 7.04492L22.955 8.81242L16.7675 14.9999L22.955 21.1874L21.1875 22.9549L15 16.7674L8.81254 22.9549L7.04504 21.1874L13.2325 14.9999L7.04504 8.81242L8.81254 7.04492L15 13.2324Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_4170">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </section>
      <section className="">
        <div className="flex justify-center">
          <Image src={success} alt="success" />
        </div>
        <p className="text-dark text-sm text-center w-10/12 mx-auto my-3">
          OTP Successfully Verified! Log in now to access your account.
        </p>
        <button onClick={() => router.push('/login')} className="bg-primary text-white flex justify-center items-center w-10/12 mx-auto rounded-lg px-3 py-3">
          Continue
        </button>
      </section>
    </div>
  );
};

export default OtpSuccess;
