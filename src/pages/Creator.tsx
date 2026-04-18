import { UsersPopup } from "../componets/sections/UsersPopup.tsx";
import { DMPopup } from "../componets/sections/DMPopup.tsx";

import { useState } from "react";
import { useDMs } from "../context/DMContext";

type PopupBtnProps = {
  title: string;
  handleClick: () => void;
};

const PopupBtn = ({ title, handleClick }: PopupBtnProps) => {
  return (
    <button className="" onClick={() => handleClick()}>
      {title}
    </button>
  );
};

const Creator = () => {
  const [userPopup, setUserPopup] = useState<boolean>(false);
  const handleUserClick = () => setUserPopup(true);
  const handleUserExit = () => setUserPopup(false);

  const [dmPopup, setDMPopup] = useState<boolean>(false);
  const handleDMClick = () => setDMPopup(true);
  const handleDMExit = () => setDMPopup(false);

  const { selectedDm } = useDMs();

  return (
    <>
      {/* Popups */}
      <UsersPopup enabled={userPopup} onPopupExit={() => handleUserExit()} />
      <DMPopup enabled={dmPopup} onPopupExit={() => handleDMExit()} />

      <div className="flex flex-col w-fit justify-start items-start">
        <PopupBtn title="Users" handleClick={handleUserClick} />
        <PopupBtn title="Direct Messages" handleClick={handleDMClick} />
        <p>selected dm: {selectedDm}</p>
      </div>
    </>
  );
};

export default Creator;
