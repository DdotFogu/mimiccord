import { MessageEdit } from "./MessageEdit";

import {
  useDMs,
  useDMsUpdate,
  DMModSelection,
} from "../../context/DMContext.tsx";

export const MessagesEditor = () => {
  const { selectedDm, getDm } = useDMs();
  const { modDm } = useDMsUpdate();

  const dm = getDm(selectedDm);

  if (!dm) return null;

  return (
    <div>
      {dm.messages.map((value, idx) => (
        <MessageEdit
          msg={value}
          idx={idx}
          key={idx}
          onTextChange={(text) => {
            let newMsg = value.copy();
            newMsg.content.setText(text);
            modDm(DMModSelection.SetMessage, dm!, [idx, newMsg]);
          }}
          onDateChange={(date) => {
            let newMsg = value.copy();
            newMsg.setSentDate(date!);
            modDm(DMModSelection.SetMessage, dm!, [idx, newMsg]);
          }}
          onOwnerChange={(owner) => {
            let newMsg = value.copy();
            newMsg.setOwner(owner);
            modDm(DMModSelection.SetMessage, dm!, [idx, newMsg]);
          }}
          onSwapClick={(swapto: number, swapfrom: number) => {
            modDm(DMModSelection.SwapMessages, dm!, [swapto, swapfrom]);
          }}
        />
      ))}
    </div>
  );
};

export default MessagesEditor;
