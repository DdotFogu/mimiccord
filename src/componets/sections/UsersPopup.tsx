import { Popup } from "../Popup";
import { PopupWindow } from "../PopupWindow.tsx";
import { UserDisplay } from "../UserDisplay.tsx";
import { AnimatePresence } from "motion/react";
import { User } from "../../types/user.ts";
import { UserEdit } from "./UserEdit.tsx";
import { AddDisplay } from "../AddDisplay";

import { useState } from "react";
import { useUsers, useUsersUpdate } from "../../context/UserContext.tsx";
import { truncate } from "../../utils/stringUtils.ts";

type PopupProps = {
  enabled: boolean;
  onPopupExit: () => void;
};

export const UsersPopup = ({ enabled, onPopupExit }: PopupProps) => {
  const { users } = useUsers();
  const { addUser } = useUsersUpdate();

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
          <span className=" popup-scroll h-fit min-h-41.5 flex flex-row flex-wrap justify-center items-center p-3 gap-5 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {Object.entries(users).map(([key, value]) => (
                <UserDisplay
                  key={key}
                  user={value}
                  onEditClick={() => handleUserEditClick(value)}
                />
              ))}
              <AddDisplay onClick={() => addUser(new User())} />
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
