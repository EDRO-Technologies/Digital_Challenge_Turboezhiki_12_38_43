import React from "react";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <div className="flex flex-col h-[1px] relative overflow-y-auto overflow-x-hidden max-h-screen w-full min-h-screen min-h-dvh">
      <Outlet />
    </div>
  );
};

export default Wrapper;
