import { IconBtn } from "../icon/IconBtn.tsx";
import {
  useDMsUpdate,
  useDMs,
  DMModSelection,
} from "../../context/DMContext.tsx";
import { DM } from "../../types/directmessage.ts";
import { useUsers } from "../../context/UserContext.tsx";
import { useState } from "react";
import { Message, Content } from "../../types/message.ts";
import Icon from "../icon/Icon.tsx";

type BarProps = {};

export const MessageBar = ({}: BarProps) => {
  const { selectedDm, getDm } = useDMs();
  const { modDm } = useDMsUpdate();
  const { getUser } = useUsers();
  const [content, setContent] = useState<Content>(new Content(""));

  const dm: DM | null = getDm(selectedDm);

  if (!dm) {
    return (
      <div className="text-[#72767D] bg-[#40444B] h-14 w-full flex flex-row justify-center items-center rounded-lg px-4">
        <p className="text-sm">Select a direct message to start chatting.</p>
      </div>
    );
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(new Content(e.target.value));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === `Enter` && !content.isEmpty()) {
      modDm(
        DMModSelection.AddMessage,
        dm.id,
        new Message(getUser("superuser"), new Date(), content),
      );
      setContent(new Content(""));
    }
  };

  return (
    <div className="text-white bg-[#40444B] h-14 w-full flex flex-row justify-start items-center rounded-lg px-2.5 gap-2">
      <IconBtn svg={<Icon id="icon-addnoring" size={26} />} />
      <input
        className="w-full text-[#d7d7da] focus:outline-none focus:ring-0"
        type="text"
        value={content.text}
        placeholder={`Message ${dm.name}`}
        onChange={(e) => handleMessageChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <IconBtn svg={<Icon id="icon-gift" size={20} />} />
      <IconBtn
        className="md:flex hidden"
        svg={<Icon id="icon-gif" size={20} />}
      />
      <IconBtn
        className="md:flex hidden"
        svg={<Icon id="icon-sticker" size={20} />}
      />
      <IconBtn svg={<Icon id="icon-emoji" size={20} />} />
      <IconBtn svg={<Icon id="icon-apps" size={20} />} />
    </div>
  );
};

export default MessageBar;
