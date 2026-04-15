import { Popup } from "../Popup";
import { PopupWindow } from "../PopupWindow.tsx";
import { UserDisplay } from "../UserDisplay.tsx";
import { AnimatePresence, motion } from "motion/react";
import { User } from "../../types/user.ts";
import { UserEdit } from "./UserEdit.tsx";

import { useState } from "react";
import { useUsers, useUsersUpdate } from "../../context/UserContext.tsx";
import { truncate } from "../../utils/stringUtils.ts";

type PopupProps = {
  enabled: boolean;
  onPopupExit: () => void;
};

export const UsersPopup = ({ enabled, onPopupExit }: PopupProps) => {
  const { users } = useUsers();

  const [selectedUserId, setSelectedIdIndex] = useState<string>("superuser");
  const [userEditPopup, setUserEditPopup] = useState<boolean>(false);
  const handleUserEditClick = (u: User) => {
    setSelectedIdIndex(u.id);
    setUserEditPopup(true);
  };
  const handleUserEditExit = () => {
    setUserEditPopup(false);
  };

  return (
    <>
      <Popup enabled={enabled}>
        <PopupWindow
          width={50}
          height={75}
          title="Users"
          subtitle="Create Remove and Edit Users"
          close={() => onPopupExit()}
        >
          <span className=" popup-scroll h-fit flex flex-row flex-wrap justify-center items-center p-3 gap-5 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {Object.entries(users).map(([key, value]) => (
                <UserDisplay
                  key={key}
                  user={value}
                  onEditClick={() => handleUserEditClick(value)}
                />
              ))}
              <AddUser />
            </AnimatePresence>
          </span>
        </PopupWindow>

        <Popup enabled={userEditPopup}>
          <PopupWindow
            width={35}
            height={60}
            title="Edit User"
            close={() => handleUserEditExit()}
            subtitle={truncate(
              users[selectedUserId] ? users[selectedUserId].username : "",
              32,
            )}
          >
            <UserEdit user={users[selectedUserId]} />
          </PopupWindow>
        </Popup>
      </Popup>
    </>
  );
};

export default UsersPopup;

const AddUser = () => {
  const { addUser } = useUsersUpdate();

  const handleAddClick = () => {
    addUser();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
      className="w-fit h-fit flex flex-col items-center justify-center rounded-2xl text-white bg-darkermist"
    >
      <button onClick={() => handleAddClick()}>
        <svg
          className=" w-full h-full p-5 cursor-pointer fill-mist
          hover:fill-white hover:scale-110
          active:scale-100
          duration-500
          "
          width="54"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
        </svg>
      </button>
    </motion.div>
  );
};
