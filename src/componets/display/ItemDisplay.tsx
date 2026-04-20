import { motion } from "motion/react";
import { truncate } from "../../utils/stringutils.ts";
import Icon from "../Icon.tsx";

type DisplayProps = {
  size?: number;
  title?: string;
  icon?: string;
  deleteable?: boolean;
  editable?: boolean;
  selectable?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onSelect?: () => void;
};

export const ItemDisplay = ({
  size,
  title,
  icon,
  editable,
  onEditClick,
  deleteable,
  onDeleteClick,
  selectable,
  onSelect,
}: DisplayProps) => {
  return (
    <motion.div
      style={{ minWidth: size, minHeight: size }}
      className="text-white bg-darkermist flex flex-col items-center justify-center rounded-2xl gap-1 py-2"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
      whileHover={
        selectable ? { scale: 1.08, transition: { duration: 0.5 } } : {}
      }
      onClick={selectable ? () => onSelect!() : () => {}}
    >
      {title && (
        <span className=" font-semibold text-center min-h-6 max-w-35.5 flex flex-col truncate shrink">
          {truncate(title, 10)}
        </span>
      )}

      {icon && <img className="rounded-full" width={70} src={icon} />}

      <span className="flex flex-row justify-center items-center w-fit gap-5 ">
        {editable && (
          <button className=" cursor-pointer" onClick={() => onEditClick!()}>
            <Icon id="icon-edit" size={20} />
          </button>
        )}

        {deleteable && (
          <button className="cursor-pointer" onClick={() => onDeleteClick!()}>
            <Icon id="icon-delete" size={20} />
          </button>
        )}
      </span>
    </motion.div>
  );
};

export default ItemDisplay;
