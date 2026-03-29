import { useState } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { axiosInstance } from "../lib/axios";
import type { UserType } from "../util/types";

export default function SearchUsers() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserType[]>([]);

  document.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).closest(".search-users-dropdown")) {
      setOpen(false);
    }
  });

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }


    //debounce search by 300ms
    setTimeout(async () => {
      const res = await axiosInstance.post(`/users/search?q=${value}`);
      setResults(res.data);
    }, 300);
  };

  return (
    <div className="relative search-users-dropdown">
      {/* Trigger Button */}
      <button
        title="add new contact"
        className=" cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MdPersonAddAlt1 size={25} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-10 left-5 w-72 bg-gray-800 rounded-xl shadow-lg p-3 z-50">
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
          />

          <div className="mt-3 max-h-60 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-sm text-gray-400 text-center">
                No users found
              </p>
            ) : (
              results.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                >
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.fullName}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                      {user.fullName.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <span className="text-white text-sm">{user.fullName}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
