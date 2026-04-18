import { Popup } from "../Popup.tsx";
import { PopupWindow } from "../PopupWindow.tsx";
import { DmDisplay } from "../DmDisplay.tsx";
import { AnimatePresence } from "motion/react";
import { AddDisplay } from "../AddDisplay";

import { useDMs, useDMsUpdate } from "../../context/DMContext.tsx";
import { DM } from "../../types/directmessage.ts";

type PopupProps = {
  enabled: boolean;
  onPopupExit: () => void;
};

export const DMPopup = ({ enabled, onPopupExit }: PopupProps) => {
  const { dms } = useDMs();
  const { addDm, selectDm } = useDMsUpdate();

  const handleDmSelect = (id: string) => {
    selectDm(id);
    onPopupExit();
  };

  return (
    <>
      <Popup enabled={enabled}>
        <PopupWindow
          width={50}
          height={75}
          title="DMs"
          subtitle="Create Remove and Select Direct Messages to Edit"
          close={() => onPopupExit()}
        >
          <span className="popup-scroll h-fit min-h-41.5 flex flex-row flex-wrap justify-center items-center p-3 gap-5 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {[...dms.entries()].map(([key, value]) => (
                <DmDisplay
                  key={key}
                  dm={value}
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
