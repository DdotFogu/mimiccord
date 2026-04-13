import { UserProvider } from "./context/UserContext"
import { DMProvider } from "./context/DMContext";
import { Routes, Route } from "react-router";
import Creator from "./pages/Creator";
import Fakecord from "./pages/Fakecord";
import Landing from "./pages/Landing";

function App() {
  return (
    <UserProvider>
      <DMProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="Creator" element={<Creator />} />
          <Route path="Fakecord" element={<Fakecord />} />
        </Routes>
      </DMProvider>
    </UserProvider>
  )
}

export default App;