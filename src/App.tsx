import { UserProvider } from "./context/UserContext"
import { DMProvider } from "./context/DMContext";

function App() {
  return (
    <UserProvider>
      <DMProvider>
        <p className="text-red-500">
          Hello world!
        </p>
      </DMProvider>
    </UserProvider>
  )
}

export default App;
