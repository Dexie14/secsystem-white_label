"use client";
import React from "react";

import { useGetingHealth } from "@/hooks/useHealthGet";
import { Spinner } from "../Spinner";
import moment from "moment";

const Health = () => {
  const { data: health , isLoading} = useGetingHealth();

  // console.log(health, "ddd");
  return (
    <div className="h-[100%]">
      <section className="flex justify-between mb-5">
        <h1 className="text-2xl text-dark" style={{ fontFamily: "DMSans" }}>
          Health Overview
        </h1>
      </section>

      {/* <div className="border border-primary px-7 py-4 bg-white rounded-lg mt-10">
        <h1 className="text-dark mb-5 text-2xl">The health information is provided below</h1>
        {health &&
          health?.map((item) => {
            return (
              <div key={item?._id}>
                <ul>
                  <li className="text-xl mb-4 mr-3 list-disc">
                    App Version: <span className="text-base text-dark">{item?.appVersion}</span>
                  </li>
                  <hr className="border border-primary mb-4"/>
                  <li className="text-xl mb-4 mr-3 list-disc">
                    Paper Level: <span className="text-base text-dark">{item?.paperLevel}</span>
                  </li>
                  <hr className="border border-primary mb-4"/>
                  <li className="text-xl mb-4 mr-3 list-disc">
                    Terminal Type: <span className="text-base text-dark">{item?.terminalType}</span>
                  </li>
                  <hr className="border border-primary mb-4"/>
                  <li className="text-xl mb-4 mr-3 list-disc">
                    Battery Level: <span className="text-base text-dark">{item?.batteryLevel}</span>
                  </li>
                  <hr className="border border-primary mb-4"/>
                  <li className="text-xl mb-4  mr-3 list-disc">
                    Location: <span className="text-base text-dark">{item?.location}</span>
                  </li>
                </ul>
              </div>
            );
          })}
      </div> */}
        <table className=" w-full table-auto tabling">
        <thead className="text-left mb-3 border-b-4">
          <tr className="bg-secondary px-3">
            <th className=" text-sm font-semibold text-[#333333] py-4 pl-2 ">
              Terminal ID
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Serial Number
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              App Version
            </th>
            <th className=" text-sm font-semibold text-[#333333]">
              Terminal Type
            </th>
            <th className=" text-sm font-semibold text-[#333333]">Printer Status </th>
            <th className=" text-sm font-semibold text-[#333333]">Battery Level</th>
            <th className=" text-sm font-semibold text-[#333333]">
              Date Time
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <Spinner />
        ) : 
        health ? (
          <tbody className="bg-white cursor-pointer  ">
            {Array.isArray(health) && health?.length > 0 ? (
              health?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b-4"
                  style={{
                    boxShadow: "0px 2px 2px 0px rgba(34, 34, 34, 0.10);",
                  }}
                >
                  <td className="text-sm font-normal text-[#333333] pl-2 py-4">
                    {item?.terminalId}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.serialNumber}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.appVersion}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.terminalType}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.printerStatus}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {item?.batteryLevel}
                  </td>
                  <td className="text-sm font-normal text-[#333333]">
                    {/* {moment(item?.dateTime).format("MMMM Do YYYY, h:mm a")} */}
                    {item?.dateTime}
                  </td>
                </tr>
              ))
            ) : (
              <p className="my-10 text-center ">No data available</p>
            )}
          </tbody>
        ) : (
          <p>no data available</p>
        )}
      </table>
    </div>
  );
};

export default Health;
