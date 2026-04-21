import { Popup } from "./Popup.tsx";
import { PopupWindow } from "./PopupWindow.tsx";
import { AnimatePresence } from "motion/react";
import { ItemDisplay } from "../display/ItemDisplay.tsx";

import {
  useDMsUpdate,
  DMModSelection,
  useDMs,
} from "../../context/DMContext.tsx";
import { useUsers } from "../../context/UserContext.tsx";
import { User } from "../../types/user.ts";
import { truncate } from "../../utils/stringutils.ts";

type PopupProps = {
  enabled: boolean;
  onExit: () => void;
};

export const AddUserPopup = ({ enabled, onExit }: PopupProps) => {
  const { selectedDm, getDm } = useDMs();
  const dm = getDm(selectedDm);

  if (!dm) return <></>;

  const { modDm } = useDMsUpdate();
  const { users } = useUsers();

  const handleUserSelect = (u: User) =>
    modDm(DMModSelection.AddMember, dm.id, u);

  return (
    <>
      <Popup enabled={enabled}>
        <PopupWindow
          width={50}
          height={75}
          title={truncate(dm.name, 30)}
          subtitle="Select User to Add"
          close={() => onExit()}
        >
          <span className="popup-scroll min-h-41.5 flex flex-row flex-wrap justify-center items-center gap-5 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {Object.entries(users)
                .filter(
                  ([_, value]) => ![...dm.members.values()].includes(value),
                )
                .map(([key, value]) => (
                  <ItemDisplay
                    key={key}
                    size={140}
                    title={value.username}
                    icon={value.pfp}
                    selectable={true}
                    onSelect={() => handleUserSelect(value)}
                  />
                ))}
            </AnimatePresence>
          </span>
        </PopupWindow>
      </Popup>
    </>
  );
};

export default AddUserPopup;
