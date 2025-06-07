import { CiHeart } from "react-icons/ci";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./CharacterList";
import { IoTrashOutline } from "react-icons/io5";

function Navbar({
  characters,
  query,
  setQuery,
  favourites,
  onDeleteFavourite,
}) {
  const numOfCharacters = characters?.length;
  const numOfFavourites = favourites?.length;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-slate-700 p-4 rounded-2xl mb-4">
      <div className="text-slate-300 font-bold">LOGO ⭐</div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-field"
        type="text"
        placeholder="search ....."
      />
      <div className="text-slate-400">
        Found <strong>{numOfCharacters}</strong> Characters
      </div>
      <Modal open={isOpen} setOpen={setIsOpen} title="List Of Favourites">
        {favourites?.map((item) => {
          return (
            <Character
              key={item.id}
              item={item}
              characterId="1"
              onSelectCharacterId={() => {}}
            >
              <button
                onClick={() => onDeleteFavourite(item.id)}
                className="col-start-3 cursor-pointer col-end-4 row-start-1 row-end-4 text-rose-500"
              >
                <IoTrashOutline className="w-5 h-5" />
              </button>
            </Character>
          );
        })}
      </Modal>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-rose-500"
      >
        <CiHeart className="w-8 h-8" />
        <span className="absolute top-0 -right-2 text-sm bg-rose-500 text-white rounded-full flex items-center justify-center py-[1px] px-[4px]">
          {numOfFavourites}
        </span>
      </button>
    </nav>
  );
}

export default Navbar;
