import Dashboard from "@/components/Dashboard/Dashboard";
import Terminal from "@/components/Terminal/Terminal";
import React from "react";

const page = () => {
  return (
    <div className=" max-h-[calc(100vh-120px)]">
      <Terminal />
      {/* <div className=" invisible ">
      <Dashboard />
      </div> */}
    </div>
  );
};

export default page;
