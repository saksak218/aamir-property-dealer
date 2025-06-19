import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="border-amber-600 border-t-2 rounded-full w-28 h-28 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
