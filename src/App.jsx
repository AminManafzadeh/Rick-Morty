import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";

function App() {
  return (
    <div className="container max-w-[1080px] mx-auto p-4">
      <Navbar />
      <div className="flex justify-between w-full gap-8">
        <CharacterList allCharacters={allCharacters} />
        <CharacterDetail />
      </div>
    </div>
  );
}

export default App;
