import { User, Presence } from "../../types/user.ts";
import {
  useUsersUpdate,
  UserModSelection,
} from "../../context/UserContext.tsx";
import DatePicker from "react-datepicker";
import PictureInput from "../input/PictureInput.tsx";
import "react-datepicker/dist/react-datepicker.css";
import { getEventPfpUrl } from "../../utils/stringutils.ts";
import InputField from "../input/InputField.tsx";

type EditProps = {
  user: User;
};

export const UserEdit = ({ user }: EditProps) => {
  const { modUser } = useUsersUpdate();

  const handleValueChange = (mod: UserModSelection, value: any) => {
    modUser(mod, user, value);
  };

  return (
    <div className="h-full w-full flex gap-1 flex-col-reverse xl:flex-row p-4 overflow-y-auto overflow-x-hidden popup-scroll">
      <span className="w-full h-full flex flex-col gap-1 items-center">
        <InputField
          placeholder="username"
          type="text"
          value={user.username}
          handleChange={(e) =>
            handleValueChange(
              UserModSelection.Username,
              (e as React.ChangeEvent<HTMLInputElement>).target.value,
            )
          }
        />

        <InputField
          placeholder="displayname"
          type="text"
          value={user.displayname}
          handleChange={(e) =>
            handleValueChange(
              UserModSelection.Display,
              (e as React.ChangeEvent<HTMLInputElement>).target.value,
            )
          }
        />

        <InputField
          placeholder="status"
          type="text"
          value={user.status}
          handleChange={(e) =>
            handleValueChange(
              UserModSelection.Status,
              (e as React.ChangeEvent<HTMLInputElement>).target.value,
            )
          }
        />

        <textarea
          className="resize-none bg-darkermist px-3 py-2 rounded-md w-full popup-scroll focus:outline-1 focus:ring-0"
          rows={10}
          placeholder="bio"
          onChange={(e) =>
            handleValueChange(
              UserModSelection.Bio,
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
            handleValueChange(UserModSelection.PFP, getEventPfpUrl(e))
          }
        />

        <DatePicker
          className="bg-darkermist px-3 py-2 rounded-md"
          selected={user.joinDate}
          showYearDropdown
          onChange={(date: Date | null) =>
            handleValueChange(UserModSelection.JoinDate, date)
          }
        />

        <select
          className="w-full bg-darkermist px-3 py-2 rounded-md"
          value={user.presence}
          onChange={(e) =>
            handleValueChange(
              UserModSelection.Presence,
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

export default UserEdit;
