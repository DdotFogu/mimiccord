import { UsersPopup } from "../componets/sections/UsersPopup.tsx";
import { DMPopup } from "../componets/sections/DMPopup.tsx";
import { MessageBar } from "../componets/MessageBar.tsx";

import { useState } from "react";
import { useDMs } from "../context/DMContext";

type PopupBtnProps = {
  title: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  handleClick: () => void;
};

const PopupBtn = ({ title, icon, handleClick }: PopupBtnProps) => {
  return (
    <button
      className="bg-darkmist px-3 py-2 w-full text-white rounded-2xl font-bold flex flex-row justify-start gap-2"
      onClick={() => handleClick()}
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

  const { selectedDm } = useDMs();

  return (
    <>
      {/* Popups */}
      <UsersPopup enabled={userPopup} onPopupExit={() => handleUserExit()} />
      <DMPopup enabled={dmPopup} onPopupExit={() => handleDMExit()} />

      <div className="flex flex-col w-fit justify-start items-start gap-3 p-5">
        <PopupBtn
          title="Users"
          handleClick={handleUserClick}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113q0 66-47 113Z" />
            </svg>
          }
        />
        <PopupBtn
          title="Direct Messages"
          handleClick={handleDMClick}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z" />
            </svg>
          }
        />
      </div>
      <MessageBar />
    </>
  );
};

export default Creator;
