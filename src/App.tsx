import { UserProvider } from "./context/UserContext";
import { DMProvider } from "./context/DMContext";
import { PopupProvider } from "./context/PopupContext";
import { Routes, Route } from "react-router";
import Creator from "./pages/Creator";
import Fakecord from "./pages/Fakecord";
import Landing from "./pages/Landing";
import PopupManager from "./componets/popup/PopupManager.tsx";
import SpriteSheet from "./componets/icon/SpriteSheet.tsx";

function App() {
  return (
    <>
      <SpriteSheet />
      <UserProvider>
        <DMProvider>
          <PopupProvider>
            <PopupManager />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="Creator" element={<Creator />} />
              <Route path="Fakecord" element={<Fakecord />} />
            </Routes>
          </PopupProvider>
        </DMProvider>
      </UserProvider>
    </>
  );
}

export default App;
