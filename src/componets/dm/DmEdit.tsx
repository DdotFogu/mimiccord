import InputField from "../input/InputField.tsx";
import PictureInput from "../input/PictureInput.tsx";
import IconBtn from "../icon/IconBtn.tsx";
import Icon from "../icon/Icon.tsx";
import Avatar from "../user/Avatar.tsx";
import { motion, AnimatePresence } from "motion/react";

import { DM } from "../../types/directmessage.ts";
import { User } from "../../types/user.ts";
import { truncate, getEventPfpUrl } from "../../utils/stringutils.ts";
import {
  useDMsUpdate,
  useDMs,
  DMModSelection,
} from "../../context/DMContext.tsx";

type EditProps = {
  onAddClick: () => void;
};

const DmEdit = ({ onAddClick }: EditProps) => {
  const { modDm } = useDMsUpdate();
  const { selectedDm, getDm } = useDMs();
  const dm: DM | null = getDm(selectedDm);

  if (!dm) return <></>;

  const handleDeleteClick = (u: User) =>
    modDm(DMModSelection.RemoveMember, dm, u);

  const handleCrownClick = (u: User) => modDm(DMModSelection.Owner, dm, u.id);

  return (
    <div className="w-[15%] h-[30%] min-w-37.5 bg-darkmist rounded-md flex flex-col">
      <Header />

      <span className="flex flex-col flex-1 min-h-0 px-2 py-1 gap-1 text-[#72767D]">
        <div className="flex items-center">
          <span className="mr-auto text-sm">Users</span>
          <IconBtn
            svg={<Icon id="icon-addnoring" size={24} />}
            onClick={onAddClick}
            className="ml-auto cursor-pointer"
          />
        </div>

        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          <AnimatePresence>
            {[...dm.members.entries()].map(([key, value]) => (
              <UserItem
                key={key}
                user={value}
                onDeleteClick={() => handleDeleteClick(value)}
                onCrownClick={() => handleCrownClick(value)}
              />
            ))}
          </AnimatePresence>
        </div>
      </span>
    </div>
  );
};

const Header = () => {
  const { selectedDm, getDm } = useDMs();
  const { modDm } = useDMsUpdate();
  const dm: DM | null = getDm(selectedDm);

  if (!dm) return <></>;

  const handleValueChange = (mod: DMModSelection, value: any) => {
    modDm(mod, dm, value);
  };

  return (
    <span className="flex flex-row gap-2 p-2 h-fit bg-darkermist rounded-t-md items-center">
      <PictureInput
        size={64}
        pfp={dm.pfp}
        onChange={(e) =>
          handleValueChange(DMModSelection.PFP, getEventPfpUrl(e))
        }
      />

      <InputField
        className="w-full text-white bg-darkmist rounded-md py-1 px-2 h-fit focus:outline-1 focus:ring-0"
        placeholder="name"
        type="text"
        value={dm.name}
        handleChange={(e) =>
          handleValueChange(
            DMModSelection.Name,
            (e as React.ChangeEvent<HTMLInputElement>).target.value,
          )
        }
      />
    </span>
  );
};

type ItemProps = {
  user: User;
  onDeleteClick?: () => void;
  onCrownClick?: () => void;
};

const UserItem = ({ user, onDeleteClick, onCrownClick }: ItemProps) => {
  const { selectedDm, getDm } = useDMs();
  const dm: DM | null = getDm(selectedDm);

  if (!dm) return <></>;

  return (
    <motion.span
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
      className="w-full h-fit flex flex-row 2xl:gap-2 items-center"
    >
      <Avatar
        size={32}
        pfp={user.pfp}
        className="2xl:flex hidden rounded-full object-cover"
      />
      {truncate(user.username, 10)}
      {dm.isOwner(user) ? (
        <Icon id="icon-crownstatic" size={20} className="ml-auto mr-1.5" />
      ) : (
        <IconBtn
          svg={<Icon id="icon-crown" size={20} />}
          onClick={onCrownClick}
          className="ml-auto cursor-pointer"
        />
      )}
      <IconBtn
        svg={<Icon id="icon-delete" size={20} />}
        onClick={onDeleteClick}
        className="cursor-pointer"
      />
    </motion.span>
  );
};

export default DmEdit;
