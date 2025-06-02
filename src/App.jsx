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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        console.log(res?.data?.results);
        setCharacters(res?.data?.results);
      } catch (error) {
        setCharacters([]);
        toast.error(error?.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query]);

  return (
    <div className="container max-w-[1080px] mx-auto p-4">
      <Toaster />
      <Navbar characters={characters} query={query} setQuery={setQuery} />
      <div className="flex justify-between w-full gap-8">
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </div>
    </div>
  );
}

export default App;
