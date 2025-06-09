import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacters(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [characterId, setCharacterId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);

  const handleSelectCharacterId = (id) => {
    setCharacterId(characterId === id ? null : id);
  };

  const handleAddFavourites = (char) => {
    setFavourites([...favourites, char]);
  };

  const handleDeleteFavourite = (id) => {
    setFavourites(favourites?.filter((fav) => fav.id !== id));
  };

  const isAddedToFavourite = favourites
    ?.map((fav) => fav.id)
    .includes(characterId);

  return (
    <div className="container max-w-[1080px] mx-auto p-4">
      <Toaster />

      <Navbar
        characters={characters}
        query={query}
        setQuery={setQuery}
        favourites={favourites}
        onDeleteFavourite={handleDeleteFavourite}
      />
      <div className="flex justify-between w-full gap-8">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacterId={handleSelectCharacterId}
          characterId={characterId}
        />
        <CharacterDetail
          characterId={characterId}
          onAddToFavourites={handleAddFavourites}
          isAddedToFavourite={isAddedToFavourite}
        />
      </div>
    </div>
  );
}

export default App;
