"use client"

import { useState } from "react";
import Button from "../Comps/Button";

import { useCreateAdminRoute } from "@/hooks/useSetRoute";

import { useGetRoute } from "@/hooks/useRouteGet";

const Route = () => {

  
  const [identify, setIdentify] = useState("");
  const { mutate: setAdmin, isPending } = useCreateAdminRoute();

  const createSet = () => {
    setAdmin({ identify })
  }

  const { data: data,  } = useGetRoute();


  

  return (
    <div className="h-[100%]">
     <section className="flex justify-between">
        <h1 className="text-2xl text-dark" style={{ fontFamily: "DMSans" }}>
          Route Overview
        </h1>
      </section>
      <section className="my-10">
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="identify"
            className="text-sm  font-semibold text-[#333333] mb-1"
          >
            Identifier Name
          </label>
          <select onChange={(e) => setIdentify(e.target.value)} className="mb-5 text-sm rounded-lg px-3 py-3 bg-[#f2f2f2] border border-border outline-none">
            <option selected disabled>
              Select Identifier Name
            </option>
            {data?.map((item) => {
              return <option>{item?.identifier}</option>;
            })}
          </select>
        </div>
        <Button
          onClick={createSet}
          className="w-full px-3 py-2"
        >
          {isPending ? "Setting" : "Set"}
        </Button>
      </section>
    </div>
  );
};

export default Route;
