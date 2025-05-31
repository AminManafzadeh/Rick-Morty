import { character } from "../../data/data";
import { episodes } from "../../data/data";
import { IoArrowUpCircleOutline } from "react-icons/io5";

function CharacterDetail() {
  return (
    <div className=" w-[50%]">
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
          <div className="btn btn-primary">
            <button>Add to Favourites</button>
          </div>
        </div>
      </div>

      <Episodes episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function Episodes({ episodes }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-slate-400 mb-2 font-bold text-xl">
          List of Episodes :
        </h2>
        <button>
          <IoArrowUpCircleOutline className="icon transition-all 0.3s ease-in-out text-slate-300 flex items-center justify-center" />
        </button>
      </div>

      <div>
        <ul>
          {episodes?.map((item, index) => {
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
