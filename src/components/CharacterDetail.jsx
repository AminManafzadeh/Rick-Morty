import { useEffect, useState } from "react";
import { episodes } from "../../data/data";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";

function CharacterDetail({
  characterId,
  onAddToFavourites,
  isAddedToFavourite,
}) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSingleCharacter() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        console.log(data);
        setCharacter(data);

        const episodesId = data.episode.map((ep) => ep.split("/").at(-1));

        const { data: episode } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        console.log(episode);
        setEpisodes(episode.flat().slice(0, 4));
      } catch (error) {
        toast.error(error?.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (characterId) fetchSingleCharacter();
  }, [characterId]);

  if (!character)
    return (
      <div className="font-bold text-2xl text-slate-100">
        Please select a character
      </div>
    );

  return (
    <div className=" w-[60%]">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex bg-slate-800 overflow-hidden rounded-lg mb-8">
          <img
            className="w-40 h-auto max-h-60 object-cover object-center"
            src={character.image}
            alt={character.name}
          />
          <div className="ml-4 py-2">
            <h3 className="text-xl mb-1">
              <span>{character.gender === "Male" ? "👨" : "👩"}</span>
              <span className="text-slate-100">{character.name}</span>
            </h3>
            <div className="text-sm mb-4 text-slate-200">
              <span
                className={`${
                  character.status === "Dead" ? "bg-red-700" : ""
                } inline-block w-3 h-3 rounded-full bg-green-500 mr-2 `}
              ></span>
              <span className="">{character.status}</span>
              <span> - {character.species}</span>
            </div>
            <div className="text-slate-500 mb-4 last:mt-[0.2rem] last:text-slate-300 last:font-bold">
              <p>Last Known Location:</p>
              <p className="text-slate-300">{character.location.name}</p>
            </div>
            <div className="">
              {isAddedToFavourite ? (
                <p className="text-slate-100 font-bold text-xl">
                  Already Added to Favourites ✅
                </p>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => onAddToFavourites(character)}
                >
                  Add to Favourites
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Episodes episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function Episodes({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-slate-400 mb-2 font-bold text-xl">
          List of Episodes :
        </h2>
        <button
          onClick={() => setSortBy(!sortBy)}
          className={
            sortBy === true
              ? "rotate-0 transition-all 0.3s ease-out"
              : "rotate-180 transition-all 0.3s ease-out "
          }
        >
          <IoArrowUpCircleOutline className="icon transition-all 0.3s ease-in-out text-slate-300 flex items-center justify-center" />
        </button>
      </div>

      <div>
        <ul>
          {sortedEpisodes?.map((item, index) => {
            return (
              <li
                className="flex items-center justify-between text-slate-200 py-2 px-0"
                key={item.id}
              >
                <div>
                  {String(index + 1).padStart(2, "0")} {item.episode} -{" "}
                  <strong>{item.name}</strong>
                </div>
                <div className="btn btn-primary">{item.air_date}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
