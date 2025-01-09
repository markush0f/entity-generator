import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalNoReesponsive from "./modalNoResponsive";

const Top = () => {


  return (
    <div className="lg:fixed top-0 w-full h-16 flex items-center pt-5 px-4">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-white text-2xl font-bold">Entity generator v1</h1>
        <h1 className="text-xl">
          BY <span className="text-blue-600">MAMDEV</span>
        </h1>
      </div>

      <a href="https://github.com/markush0f" className="ml-auto">
        <img
          src="icons/github-dark.svg"
          alt="GitHub logo"
          width="30"
          height="30"
        />
      </a>

    </div>
  );
};

export default Top;
