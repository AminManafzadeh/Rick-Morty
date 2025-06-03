import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [characterId, setCharacterId] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        console.log(res?.data?.results);
        setCharacters(res?.data?.results.slice(0, 5));
      } catch (error) {
        setCharacters([]);
        toast.error(error?.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query]);

  const handleSelectCharacterId = (id) => {
    setCharacterId(characterId === id ? null : id);
  };

  const handleAddFavourites = (char) => {
    setFavourites([...favourites, char]);
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
