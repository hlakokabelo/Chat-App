import { useState } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { axiosInstance } from "../lib/axios";
import type { UserType } from "../util/types";
import { getInitials } from "./AvatarPlaceHolder";
import UserDetail from "./UserDetail";

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

  return (
    <div className="relative search-users-dropdown">
      {/* Trigger Button */}
      <button
        title="add new contact"
        className="cursor-pointer transition-transform hover:scale-110 active:scale-95 text-primary hover:text-secondary "
        onClick={() => {
          setOpen((prev) => !prev);
          setSelectedUser(null);
        }}
      >
        <MdPersonAddAlt1 size={25} />
      </button>

      <div
        hidden={!selectedUser}
        className="z-60 flex-col items-center flex left-15 top-0 absolute "
      >
        {selectedUser && (
          <UserDetail
            onClose={() => setSelectedUser(null)}
            className="search-users-dropdown
            text-center w-96 rounded-3xl border bg-base-300 border-primary"
            user={selectedUser!}
          />
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div 
        hidden={!!selectedUser}
        className="absolute top-10 left-0 w-80 rounded-xl shadow-xl border z-50 overflow-hidden bg-base-100 border-base-300">
          {/* Search Input Section */}
          <div className="p-4 border-b border-base-200 bg-base-100">
            <input
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-base-200 border border-base-300 text-base-content placeholder:text-base-content/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Results Section */}
          <div className="max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-base-content/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-base-content/60 text-center">
                  No users found
                </p>
                <p className="text-xs text-base-content/40 text-center mt-1">
                  Try a different name
                </p>
              </div>
            ) : (
              results.map((user) => {
                return (
                  <div
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                    }}
                    className="group flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 border-b border-base-200 last:border-0 hover:bg-primary/5"
                  >
                    {/* Avatar */}
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/30 transition-all"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content text-sm font-medium shadow-sm">
                        {getInitials(user.name || "")}
                      </div>
                    )}

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-base-content font-medium group-hover:text-primary transition-colors truncate">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="text-xs text-base-content/50 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
