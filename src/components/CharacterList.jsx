import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Loading from "./Loading";

function CharacterList({
  characters,
  isLoading,
  onSelectCharacterId,
  characterId,
}) {
  return (
    <div className="w-[40%]">
      {isLoading ? (
        <Loading />
      ) : (
        characters?.map((item) => {
          return (
            <Character
              key={item.id}
              item={item}
              onSelectCharacterId={onSelectCharacterId}
              characterId={characterId}
            />
          );
        })
      )}
    </div>
  );
}

export default CharacterList;

function Character({ item, onSelectCharacterId, characterId }) {
  return (
    <div className="grid gap-x-4 mb-4 grid-cols-[4rem_1fr_2rem] grid-rows-2 bg-slate-800 rounded-2xl p-2 cursor-pointer transition-all 0.2s ease-out hover:bg-slate-700">
      <img
        className="col-start-1 col-end-2 row-start-1 row-end-4 w-16 h-16 rounded-2xl"
        src={item.image}
        alt={item.name}
      />
      <div className="col-start-2 col-end-3 row-start-1 row-end-4 text-center ">
        <h3 className=" text-slate-200">
          <span>{item.gender === "Male" ? "👨" : "👩"}</span>
          <span>{item.name}</span>
        </h3>
        <div className=" self-center text-slate-200">
          <span
            className={`${
              item.status === "Dead" ? "!bg-rose-600" : ""
            } inline-block w-3 h-3 rounded-full bg-green-500 mr-2`}
          ></span>
          <span className="">{item.status}</span>
          <span> - {item.species}</span>
        </div>
      </div>
      <button
        onClick={() => onSelectCharacterId(item.id)}
        className="col-start-3 col-end-4 row-start-1 row-end-4 text-rose-500"
      >
        {characterId === item.id ? (
          <IoEyeOffOutline className="w-5 h-5" />
        ) : (
          <IoEyeOutline className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
