import { DM } from "../types/directmessage.ts";
import { useDMsUpdate } from "../context/DMContext.tsx";
import { motion } from "motion/react";
import { truncate } from "../utils/stringUtils.ts";

type DisplayProps = {
  dm: DM;
  onSelect: () => void;
};

// turn DmDisplay and User Display into one component
// can create context for popups so its children can has access to it funcs <- IMPORTANT IDEA

export const DmDisplay = ({ dm, onSelect }: DisplayProps) => {
  const { removeDm } = useDMsUpdate();

  const handleDmDelete = () => removeDm(dm.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
      whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
      className="text-white bg-darkermist min-w-36 max-w-36 min-h-fit flex flex-col items-center rounded-2xl gap-1 py-2 cursor-pointer"
      onClick={() => onSelect()}
    >
      <span className="font-semibold text-center w-full truncate px-2">
        {truncate(dm.name, 10)}
      </span>

      <img className="rounded-full" width={70} src={dm.pfp} />

      <span className="flex flex-row justify-center items-center w-fit gap-5 ">
        <button className="cursor-pointer" onClick={() => handleDmDelete()}>
          <motion.svg
            initial={{ fill: "#9D9EA5" }}
            whileHover={{ fill: "#FF746C", transition: { duration: 0.25 } }}
            className="fill-mist"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
          </motion.svg>
        </button>
      </span>
    </motion.div>
  );
};

export default DmDisplay;
