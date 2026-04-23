import InputField from "../input/InputField";
import DatePicker from "react-datepicker";
import IconBtn from "../icon/IconBtn";
import Icon from "../icon/Icon";
import { type Message } from "../../types/message.ts";
import { useDMs } from "../../context/DMContext.tsx";
import { useUsers } from "../../context/UserContext.tsx";
import "react-datepicker/dist/react-datepicker.css";

type MessageProps = {
  msg: Message;
  idx: number;
  onTextChange: (text: string) => void;
  onDateChange: (date: Date | null) => void;
  onOwnerChange: (owner: string) => void;
  onSwapClick: (swapto: number, swapfrom: number) => void;
};

export const MessageEdit = ({
  msg,
  idx,
  onTextChange,
  onDateChange,
  onOwnerChange,
  onSwapClick,
}: MessageProps) => {
  const { getUser } = useUsers();

  const { selectedDm, getDm } = useDMs();
  const dm = getDm(selectedDm);

  if (!dm) return null; // find a way to condense this stuff

  return (
    <div
      className="
      group
      flex flex-row items-center w-full min-h-17
      bg-[#2B2D31] hover:bg-[#2E3035]
      border border-white/6 hover:border-white/10
      rounded-lg px-3 py-2 gap-2.5
      transition-all duration-150
    "
    >
      <span className="text-[#6D6F78] font-bold">{idx}</span>

      {/* Owner select */}
      <select
        className="
          shrink-0
          bg-[#1E1F22] hover:bg-[#25262A]
          text-[#DCDDDE] text-sm
          border-0.5 border-white/8 hover:border-white/15
          focus:border-[#5865F2]/60 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/40
          px-2.5 py-1.5 rounded-md
          cursor-pointer transition-all duration-150
          max-w-45
        "
        value={msg.owner}
        onChange={(e) => onOwnerChange(e.target.value)}
      >
        {[...dm.members].map((id) => (
          <option value={id} key={id} className="bg-[#1E1F22]">
            {getUser(id).displayname} ({getUser(id).username})
          </option>
        ))}
      </select>

      {/* Content input — grows to fill */}
      <div className="flex-1 min-w-0 bg-[#1E1F22] rounded-md">
        <InputField
          placeholder="content"
          type="text"
          value={msg.content.text}
          handleChange={(e) =>
            onTextChange(
              (e as React.ChangeEvent<HTMLInputElement>).target.value,
            )
          }
          className="
            w-full bg-transparent
            px-2.5 py-1 rounded-md
            text-[#DCDDDE] placeholder-[#6D6F78] text-sm
            focus:border-[#5865F2]/60 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/40
          "
        />
      </div>

      {/* Date picker */}
      <DatePicker
        className="
          shrink-0
          bg-[#1E1F22]
          text-[#DCDDDE] text-sm
          focus:border-[#5865F2]/60 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/40
          px-2.5 py-1.5 rounded-md
          cursor-pointer transition-all duration-150
          w-32.5
        "
        selected={msg.sentDate}
        showYearDropdown
        onChange={(date: Date | null) => onDateChange(date)}
      />

      {/* Reorder controls */}
      <div className="flex flex-col gap-0.5">
        {idx > 0 && (
          <IconBtn
            size={16}
            svg={<Icon id="icon-arrowdropup" size={24} />}
            onClick={() => onSwapClick(idx, idx - 1)}
            className="ml-auto cursor-pointer"
          />
        )}
        {idx + 1 < dm.messages.length && (
          <IconBtn
            size={16}
            svg={<Icon id="icon-arrowdropdown" size={24} />}
            onClick={() => onSwapClick(idx, idx + 1)}
            className="ml-auto cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default MessageEdit;
