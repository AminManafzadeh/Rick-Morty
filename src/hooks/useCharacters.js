import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}=${query}`, { signal });
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

  return { characters, isLoading };
}
