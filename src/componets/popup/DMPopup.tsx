import { Popup } from "./Popup.tsx";
import { PopupWindow } from "./PopupWindow.tsx";
import { AnimatePresence } from "motion/react";
import { AddDisplay } from "../display/AddDisplay.tsx";
import { ItemDisplay } from "../display/ItemDisplay.tsx";

import { useDMs, useDMsUpdate } from "../../context/DMContext.tsx";
import { DM } from "../../types/directmessage.ts";

type PopupProps = {
  enabled: boolean;
  onExit: () => void;
};

export const DMPopup = ({ enabled, onExit }: PopupProps) => {
  const { dms } = useDMs();
  const { addDm, selectDm, removeDm } = useDMsUpdate();

  const handleDmSelect = (id: string) => {
    selectDm(id);
    onExit();
  };

  return (
    <>
      <Popup enabled={enabled}>
        <PopupWindow
          width={50}
          height={75}
          title="DMs"
          subtitle="Create Remove and Select Direct Messages to Edit"
          close={() => onExit()}
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
