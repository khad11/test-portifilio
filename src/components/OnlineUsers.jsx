import { DiPerl } from "react-icons/di";
import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

function OnlineUsers() {
  const { documents } = useCollection("users");

  return (
    <div className=" bg-slate-800 h-screen p-10 rounded-tl-2xl rounded-bl-2xl  text-white">
      <div className="w-[150px]">
        <h1 className="mb-4 text-center text-xl font-bold">USERS</h1>
        <ul>
          {documents &&
            documents.map((doc) => {
              return (
                <li
                  key={doc.id}
                  className={` flex  items-center gap-5 mb-3 p-2 rounded ${
                    doc.online ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <img src={doc.photoURL} alt=" " className="w-10  h-10" />
                  <p>{doc.displayName}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default OnlineUsers;
