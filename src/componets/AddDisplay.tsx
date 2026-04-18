import { motion } from "motion/react";

type DisplayProps = {
  onClick: () => void;
};

export const AddDisplay = ({ onClick }: DisplayProps) => {
  const handleAddClick = () => onClick();

  return (
    <motion.button
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
      whileHover={{ scale: 1.04, transition: { duration: 0.13 } }}
      className="w-fit h-fit flex flex-col items-center justify-center rounded-2xl text-white bg-darkermist"
      onClick={() => handleAddClick()}
    >
      <svg
        className=" w-full h-full p-5 cursor-pointer fill-mist
          hover:fill-white hover:scale-110
          active:scale-100
          duration-500
          "
        width="54"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
      </svg>
    </motion.button>
  );
};
