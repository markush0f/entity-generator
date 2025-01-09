import React from "react";
import { motion } from "framer-motion";

const Top = () => {
  const box = {
    width: "100px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
    borderRadius: "10px",
  };
  return (
    <div className="fixed top-0 w-full h-16 flex items-center pt-5 px-4">
      {/* Botón de exclamación a la izquierda */}
      <motion.img
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        src="icons/exclamation.svg"
        width={50}
      >
      </motion.img>

      {/* Contenedor de texto centrado */}
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
