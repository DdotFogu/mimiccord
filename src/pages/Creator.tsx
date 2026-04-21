import { UsersPopup } from "../componets/popup/UsersPopup.tsx";
import { DMPopup } from "../componets/popup/DMPopup.tsx";
import { AddUserPopup } from "../componets/popup/AddUserPopup.tsx";
import { MessageBar } from "../componets/app/MessageBar.tsx";
import DmEdit from "../componets/dm/DmEdit.tsx";
import Icon from "../componets/icon/Icon.tsx";

import { useState } from "react";

type PopupBtnProps = {
  title: string;
  icon?: React.ReactElement<any>;
  onClick: () => void;
};

const PopupBtn = ({ title, icon, onClick }: PopupBtnProps) => {
  return (
    <button
      className="bg-darkmist px-3 py-2 w-full text-white rounded-2xl font-bold flex flex-row justify-start gap-2"
      onClick={() => onClick()}
    >
      {icon}
      <p>{title}</p>
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

  const [addUserPopup, setaddUserPopup] = useState<boolean>(false);
  const handleAddClick = () => setaddUserPopup(true);
  const handleAddExit = () => setaddUserPopup(false); // <- FIND OUT HOW TO SOLVE THIS ISSUE I HATE ALL THIS POPUP SHIT BEING HERE SO FUCKING MUCH

  return (
    <>
      {/* Popups */}
      <UsersPopup enabled={userPopup} onExit={() => handleUserExit()} />
      <DMPopup enabled={dmPopup} onExit={() => handleDMExit()} />
      <AddUserPopup enabled={addUserPopup} onExit={() => handleAddExit()} />
      <div className="flex flex-col w-fit justify-start items-start gap-3 p-5">
        <PopupBtn
          title="Users"
          onClick={handleUserClick}
          icon={<Icon id="icon-users" />}
        />
        <PopupBtn
          title="Direct Messages"
          onClick={handleDMClick}
          icon={<Icon id="icon-message" />}
        />
      </div>{" "}
      {/* Remove these and replace them when you style this page */}
      <DmEdit onAddClick={handleAddClick} />
      <MessageBar />
    </>
  );
};

export default Creator;
