import { usePopupsUpdate } from "../context/PopupContext.tsx";
import { MessageBar } from "../componets/app/MessageBar.tsx";
import DmEdit from "../componets/dm/DmEdit.tsx";
import Icon from "../componets/icon/Icon.tsx";

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
      <div className="flex flex-col w-fit justify-start items-start gap-3 p-5">
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
      </div>
      <DmEdit onAddClick={() => open("addusers")} />
      <MessageBar />
    </>
  );
};

export default Creator;
