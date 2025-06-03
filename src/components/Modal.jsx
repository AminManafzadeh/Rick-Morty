import { IoIosCloseCircleOutline } from "react-icons/io";

function Modal({ children, title, open, setOpen }) {
  if (!open) return null;
  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className="w-screen h-screen fixed inset-0 bg-[#3f454ccc]"
      ></div>
      <div className="w-[60%] min-h-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-4 rounded-2xl shadow-box_shadow">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-b-slate-600">
          <h2 className="text-slate-200 font-medium">{title}</h2>
          <button onClick={() => setOpen(false)}>
            <IoIosCloseCircleOutline className="w-5 h-5 text-rose-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
