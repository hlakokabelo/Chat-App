import { useState } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { axiosInstance } from "../lib/axios";
import type { UserType } from "../util/types";
import { getInitials } from "./AvatarPlaceHolder";

export default function SearchUsers() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  document.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).closest(".search-users-dropdown")) {
      setOpen(false);
      setSelectedUser(null);
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

  const formatName = (name: string | undefined) => {
    if (!name) return "";
    const parts = name.split(" ");

    let finalName = "";
    parts.forEach((part, index) => {
      parts[index] = part.charAt(0).toUpperCase() + part.slice(1);
      finalName += parts[index] + " ";
    });

    return finalName.trim();
  };

  return (
    <div className="relative search-users-dropdown">
      {/* Trigger Button */}
      <button
        title="add new contact"
        className="cursor-pointer transition-transform hover:scale-110 active:scale-95 text-gray-600 hover:text-blue-500"
        onClick={() => {
          setOpen((prev) => !prev);
          setSelectedUser(null);
        }}
      >
        <MdPersonAddAlt1 size={25} />
      </button>

      <div
        hidden={!selectedUser}
        className="z-60 flex-col items-center flex absolute left-0 rounded-2xl w-96 bg-white shadow-2xl border border-gray-200 text-gray-800 text-sm px-6 py-5 top-10"
      >
        <p className="text-center text-2xl font-semibold mb-2 text-gray-800">
          {formatName(selectedUser?.fullName)}
        </p>
        {selectedUser?.profilePic ? (
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            className="w-52 h-52 m-4 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 m-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-5xl text-white font-semibold shadow-lg">
            {getInitials(selectedUser?.fullName || "")}
          </div>
        )}

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md mt-2">
          Add to Contacts
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-10 left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          <div className="max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No users found
              </p>
            ) : (
              results.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-0"
                >
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                      {getInitials(user.fullName || "")}
                    </div>
                  )}

                  <span className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors">
                    {user.fullName}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
