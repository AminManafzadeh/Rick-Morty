import { CiHeart } from "react-icons/ci";

function Navbar({ characters, query, setQuery }) {
  const numOfCharacters = characters?.length;
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
      <button className="relative text-rose-500">
        <CiHeart className="w-8 h-8" />
        <span className="absolute top-0 -right-2 text-sm bg-rose-500 text-white rounded-full flex items-center justify-center py-[1px] px-[4px]">
          4
        </span>
      </button>
    </nav>
  );
}

export default Navbar;
