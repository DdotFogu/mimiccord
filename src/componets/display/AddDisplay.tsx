import { motion } from "motion/react";
import Icon from "../Icon.tsx";

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
      className="w-24 h-24 flex flex-col items-center justify-center rounded-2xl text-white bg-darkermist "
      onClick={() => handleAddClick()}
    >
      <Icon
        id="icon-add"
        size={54}
        className="
        hover:fill-white hover:scale-110
        active:scale-100
        duration-500
        "
      />
    </motion.button>
  );
};
