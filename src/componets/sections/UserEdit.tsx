import { User, Presence } from "../../types/user.ts";
import { useUsersUpdate, UserModSelection } from "../../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
          className="resize-none bg-darkermist px-3 py-2 rounded-md w-full popup-scroll"
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

      <span className="full flex flex-col gap-2 items-center">
        <input
          id="pfp-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = (e as React.ChangeEvent<HTMLInputElement>).target
              .files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            handleValueChange(UserModSelection.PFP, url);
          }}
        />
        <label htmlFor="pfp-upload" className="cursor-pointer group relative">
          <img
            className="rounded-full"
            width={128}
            height={128}
            src={user.pfp}
          />
          <span className=" absolute inset-0 rounded-full bg-black/50 flex items-center justify-center text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Change
          </span>
        </label>

        <DatePicker
          className="bg-darkermist px-3 py-2 rounded-md"
          selected={user.joinDate}
          showYearDropdown
          onChange={(date: Date | null) =>
            handleValueChange(UserModSelection.JoinDate, date)
          }
        />

        <select
          className="w-[100%] bg-darkermist px-3 py-2 rounded-md"
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

type InputFieldProps = {
  className?: string;
  handleChange: (e: React.ChangeEvent) => void;
  value: any;
  type?: string;
  placeholder?: string;
  accept?: string;
};
const InputField = ({
  className,
  type,
  handleChange,
  value,
  placeholder,
  accept,
}: InputFieldProps) => {
  return (
    <input
      className={
        className ? className : `bg-darkermist w-full px-3 py-2 rounded-md`
      }
      type={type ? type : ""}
      accept={accept ? accept : ""}
      placeholder={placeholder ? placeholder : ""}
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
};
