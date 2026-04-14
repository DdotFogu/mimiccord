import { Popup } from "../componets/Popup.tsx";
import { PopupWindow } from "../componets/PopupWindow.tsx"
import { useState } from "react";

const Creator = () => {
    const [ userPopup, setUserPopup ] = useState<boolean>(false);
    const handleUserClick = () => { setUserPopup(true) };
    const handleUserExit = () => { setUserPopup(false) };

    return(
        <>
            <button
            className="
            px-5
            py-2
            rounded-sm
            text-white
            font-bold
            bg-green-500
            "
            onClick={() => handleUserClick()}
            >
                Users
            </button>

            <Popup
            enabled={userPopup}
            >
                <PopupWindow 
                width={ 50 }
                height={ 75 }
                title="Users"
                subtitle="Create and Edit Users"
                close={() => handleUserExit()}
                />
            </Popup>
        </>
    );
}

export default Creator;