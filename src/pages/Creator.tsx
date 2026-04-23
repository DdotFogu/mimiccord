import { MessagesEditor } from "../componets/message/MessagesEditor.tsx";
import { MessageBar } from "../componets/message/MessageBar.tsx";
import DmEdit from "../componets/dm/DmEdit.tsx";
import Icon from "../componets/icon/Icon.tsx";

import { usePopupsUpdate } from "../context/PopupContext.tsx";

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
  const { open } = usePopupsUpdate();

  return (
    <>
      <PopupBtn
        title="Users"
        onClick={() => open("users")}
        icon={<Icon id="icon-users" />}
      />
      <PopupBtn
        title="Direct Messages"
        onClick={() => open("dms")}
        icon={<Icon id="icon-message" />}
      />
      <DmEdit onAddClick={() => open("addusers")} />
      <MessageBar />
      <MessagesEditor />
    </>
  );
};

export default Creator;
