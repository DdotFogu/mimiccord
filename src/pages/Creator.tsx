import { UsersPopup } from "../componets/sections/UsersPopup.tsx";

import { useState } from "react";

const Creator = () => {
  const [userPopup, setUserPopup] = useState<boolean>(true);
  const handleUserClick = () => {
    setUserPopup(true);
  };
  const handleUserExit = () => {
    setUserPopup(false);
  };

  return (
    <>
      <UsersPopup enabled={userPopup} onPopupExit={() => handleUserExit()} />
    </>
  );
};

export default Creator;
