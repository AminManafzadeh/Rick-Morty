import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList, { Character } from "./components/CharacterList";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [characterId, setCharacterId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        console.log(res?.data?.results);
        setCharacters(res?.data?.results.slice(0, 5));
      } catch (error) {
        console.log(error.name);
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error?.response?.data?.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controler.abort();
    };
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
      <Modal open={open} setOpen={setOpen} title="modal">
        {favourites?.map((f) => {
          return <Character key={f.id} />;
        })}
      </Modal>
      <Navbar
        characters={characters}
        query={query}
        setQuery={setQuery}
        favourites={favourites}
        setOpen={setOpen}
        open={open}
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
