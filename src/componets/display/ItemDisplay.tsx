import { motion } from "motion/react";
import { truncate } from "../../utils/stringutils.ts";
import Icon from "../icon/Icon.tsx";
import IconBtn from "../icon/IconBtn.tsx";
import SelectableAvatar from "../user/SelectableAvatar.tsx";
import Avatar from "../user/Avatar.tsx";

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
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
    >
      {title && (
        <span className=" font-semibold text-center min-h-6 max-w-35.5 flex flex-col truncate shrink">
          {truncate(title, 10)}
        </span>
      )}

      {icon && selectable ? (
        <SelectableAvatar
          size={75}
          pfp={icon}
          title={"Select"}
          onClick={onSelect}
        />
      ) : (
        <>{icon && <Avatar size={75} pfp={icon} />}</>
      )}

      <span className="flex flex-row justify-center items-center w-fit gap-3 ">
        {editable && (
          <IconBtn
            svg={<Icon id="icon-edit" size={20} />}
            onClick={onEditClick}
            className="cursor-pointer"
          />
        )}

        {deleteable && (
          <IconBtn
            svg={<Icon id="icon-delete" size={20} />}
            onClick={onDeleteClick}
            className="cursor-pointer"
          />
        )}
      </span>
    </motion.div>
  );
};

export default ItemDisplay;
