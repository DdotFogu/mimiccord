import { UsersPopup } from "./UsersPopup.tsx";
import { DMPopup, AddUserPopup } from "./DMPopup.tsx";

export default function PopupManager() {
  return (
    <>
      <DMPopup />
      <AddUserPopup />
      <UsersPopup />
    </>
  );
}
