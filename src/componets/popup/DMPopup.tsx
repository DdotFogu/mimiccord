import { Popup, PopupWindow } from "./Popup.tsx";
import { AnimatePresence } from "motion/react";
import { AddDisplay } from "../display/AddDisplay.tsx";
import { ItemDisplay } from "../display/ItemDisplay.tsx";

import { useUsers } from "../../context/UserContext.tsx";
import { User } from "../../types/user.ts";
import { truncate } from "../../utils/stringutils.ts";
import {
  useDMs,
  useDMsUpdate,
  DMModSelection,
} from "../../context/DMContext.tsx";
import { usePopups, usePopupsUpdate } from "../../context/PopupContext.tsx";
import { DM } from "../../types/directmessage.ts";

export const DMPopup = () => {
  const { isOpen } = usePopups();
  const { close } = usePopupsUpdate();

  const { dms } = useDMs();
  const { addDm, selectDm, removeDm } = useDMsUpdate();

  const handleDmSelect = (id: string) => {
    selectDm(id);
    close("dms");
  };

  return (
    <>
      <Popup enabled={isOpen("dms")}>
        <PopupWindow
          width={50}
          height={75}
          title="DMs"
          subtitle="Create Remove and Select Direct Messages to Edit"
          close={() => close("dms")}
        >
          <span className="popup-scroll min-h-41.5 flex flex-row flex-wrap justify-center items-center gap-5 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {[...dms.entries()].map(([key, value]) => (
                <ItemDisplay
                  key={key}
                  size={140}
                  title={value.name}
                  icon={value.pfp}
                  deleteable={true}
                  onDeleteClick={() => removeDm(value.id)}
                  selectable={true}
                  onSelect={() => handleDmSelect(value.id)}
                />
              ))}
            </AnimatePresence>
            <AddDisplay onClick={() => addDm(new DM())} />
          </span>
        </PopupWindow>
      </Popup>
    </>
  );
};

export default DMPopup;

export const AddUserPopup = () => {
  const { isOpen } = usePopups();
  const { close } = usePopupsUpdate();

  const { modDm } = useDMsUpdate();
  const { users } = useUsers();

  const { selectedDm, getDm } = useDMs();
  const dm = getDm(selectedDm);

  if (!dm) return <></>;

  const handleUserSelect = (id: string) =>
    modDm(DMModSelection.AddMember, dm.id, id);

  return (
    <>
      <Popup enabled={isOpen("addusers")}>
        <PopupWindow
          width={50}
          height={75}
          title={truncate(dm.name, 30)}
          subtitle="Select User to Add"
          close={() => close("addusers")}
        >
          <span className="popup-scroll min-h-41.5 flex flex-row flex-wrap justify-center items-center gap-5 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {Object.entries(users)
                .filter(([key, _]) => !dm.members.has(key))
                .map(([key, value]) => (
                  <ItemDisplay
                    key={key}
                    size={140}
                    title={value.username}
                    icon={value.pfp}
                    selectable={true}
                    onSelect={() => handleUserSelect(value.id)}
                  />
                ))}
            </AnimatePresence>
          </span>
        </PopupWindow>
      </Popup>
    </>
  );
};
