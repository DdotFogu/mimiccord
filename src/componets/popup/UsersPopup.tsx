import { Popup, PopupWindow } from "./Popup.tsx";
import { AnimatePresence } from "motion/react";
import { AddDisplay } from "../display/AddDisplay.tsx";
import { ItemDisplay } from "../display/ItemDisplay.tsx";
import DatePicker from "react-datepicker";
import PictureInput from "../input/PictureInput.tsx";
import "react-datepicker/dist/react-datepicker.css";
import InputField from "../input/InputField.tsx";

import { useState } from "react";
import {
  useUsers,
  useUsersUpdate,
  UserModSelection,
} from "../../context/UserContext.tsx";
import { usePopups, usePopupsUpdate } from "../../context/PopupContext.tsx";
import { User, Presence } from "../../types/user.ts";
import { truncate, getEventPfpUrl } from "../../utils/stringutils.ts";

export const UsersPopup = () => {
  const { isOpen } = usePopups();
  const { close, open } = usePopupsUpdate();

  const { users } = useUsers();
  const { addUser, removeUser } = useUsersUpdate();

  const [selectedUserId, setSelectedIdIndex] = useState<string>("superuser"); // <- put this in context later for fakecord

  const handleUserEditClick = (u: User) => {
    open("edituser");
    setSelectedIdIndex(u.id);
  };

  return (
    <>
      <Popup enabled={isOpen("users")}>
        <PopupWindow
          width={50}
          height={75}
          title="Users"
          subtitle="Create Remove and Edit Users"
          close={() => close("users")}
        >
          <span className=" popup-scroll h-fit min-h-41.5 flex flex-row flex-wrap justify-center items-center gap-5 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {Object.entries(users).map(([key, value]) => (
                <ItemDisplay
                  key={key}
                  size={140}
                  title={value.username}
                  icon={value.pfp}
                  deleteable={key !== "superuser" ? true : false}
                  onDeleteClick={() => removeUser(value.id)}
                  editable={true}
                  onEditClick={() => handleUserEditClick(value)}
                />
              ))}
              <AddDisplay onClick={() => addUser(new User())} />
            </AnimatePresence>
          </span>
        </PopupWindow>

        <Popup enabled={isOpen("edituser")}>
          <PopupWindow
            width={35}
            height={60}
            title="Edit User"
            close={() => close("edituser")}
            subtitle={truncate(
              users[selectedUserId] ? users[selectedUserId].username : "",
              32,
            )}
          >
            <EditUser user={users[selectedUserId]} />
          </PopupWindow>
        </Popup>
      </Popup>
    </>
  );
};

export default UsersPopup;

export const EditUser = ({ user }: { user: User }) => {
  const { modUser } = useUsersUpdate();

  return (
    <div className="h-full w-full flex gap-1 flex-col-reverse xl:flex-row overflow-y-auto overflow-x-hidden popup-scroll">
      <span className="w-full h-full flex flex-col gap-1 items-center">
        <InputField
          placeholder="username"
          type="text"
          value={user.username}
          handleChange={(e) =>
            modUser(
              UserModSelection.Username,
              user,
              (e as React.ChangeEvent<HTMLInputElement>).target.value,
            )
          }
        />

        <InputField
          placeholder="displayname"
          type="text"
          value={user.displayname}
          handleChange={(e) =>
            modUser(
              UserModSelection.Display,
              user,
              (e as React.ChangeEvent<HTMLInputElement>).target.value,
            )
          }
        />

        <InputField
          placeholder="status"
          type="text"
          value={user.status}
          handleChange={(e) =>
            modUser(
              UserModSelection.Status,
              user,
              (e as React.ChangeEvent<HTMLInputElement>).target.value,
            )
          }
        />

        <textarea
          className="resize-none bg-darkermist px-3 py-2 rounded-md w-full popup-scroll focus:outline-1 focus:ring-0"
          rows={10}
          placeholder="bio"
          onChange={(e) =>
            modUser(
              UserModSelection.Bio,
              user,
              (e as React.ChangeEvent<HTMLTextAreaElement>).target.value,
            )
          }
          value={user.bio}
        />

        <span className="text-mist font-bold mt-auto hidden lg:block">
          {user.id == "superuser" ? "YOU" : user.id}
        </span>
      </span>

      <span className="w-full flex flex-col gap-1 items-center justify-start">
        <PictureInput
          size={124}
          pfp={user.pfp}
          onChange={(e) =>
            modUser(UserModSelection.PFP, user, getEventPfpUrl(e))
          }
        />

        <DatePicker
          className="bg-darkermist px-3 py-2 rounded-md focus:outline-1 focus:ring-0"
          selected={user.joinDate}
          showYearDropdown
          onChange={(date: Date | null) =>
            modUser(UserModSelection.JoinDate, user, date)
          }
        />

        <select
          className="w-full bg-darkermist px-3 py-2 rounded-md"
          value={user.presence}
          onChange={(e) =>
            modUser(
              UserModSelection.Presence,
              user,
              Number((e as React.ChangeEvent<HTMLSelectElement>).target.value),
            )
          }
        >
          <option value={Presence.Online}>Online</option>
          <option value={Presence.Offline}>Offline</option>
          <option value={Presence.DND}>Do Not Disturb</option>
          <option value={Presence.Idle}>Idle</option>
        </select>
      </span>
    </div>
  );
};
