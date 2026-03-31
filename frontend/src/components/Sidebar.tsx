import SidebarSkeleton from "./skeletons/SidebarSkeleton";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { AvatarSiderBar } from "./AvatarPlaceHolder";
import { useUsers } from "../hooks/useChat";
import { Users } from "lucide-react";
import type { Message } from "../util/types";
import SearchUsers from "./SearchUsers";
import { MdChat, MdPersonAdd, MdSearch } from "react-icons/md";
import { useState } from "react";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"chats" | "requests">("chats");

  // Mock data - replace with your actual data
  const chats = [
    {
      id: "1",
      name: "John Doe",
      avatar: null,
      lastMessage: "Hey, how are you?",
      timestamp: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: null,
      lastMessage: "See you tomorrow!",
      timestamp: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Alice Johnson",
      avatar: null,
      lastMessage: "Thanks for the help",
      timestamp: "3h ago",
      unread: 1,
      online: true,
    },
  ];

  const requests = [
    {
      id: "4",
      name: "Bob Wilson",
      avatar: null,
      mutualFriends: 3,
      timestamp: "5m ago",
    },
    {
      id: "5",
      name: "Carol Davis",
      avatar: null,
      mutualFriends: 1,
      timestamp: "2h ago",
    },
  ];
  const { selectedUser, setSelectedUser, lastMessage } = useChatStore();
  const { data: users, isLoading: isUsersLoading } = useUsers();

  const { onlineUsers } = useAuthStore();

  if (isUsersLoading) return <SidebarSkeleton />;

  const getLastMessage = (userId: string): Message | null => {
    return lastMessage[userId] || null;
  };

  const filteredByChats = users
    ? users.filter((user) =>
        user.name.toLowerCase().includes(activeTab.charAt(0).toLowerCase() ),
      )
    : [];
  const filteredUsers = filteredByChats
    ? filteredByChats.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5.5">
        <div className="flex items-center justify-between">
          <div className="flex ">
            <Users className="size-6 hidden sm:block" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
          <SearchUsers />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {/* Search Bar */}
        <div className="px-4 mb-4">
          <div className="relative">
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
              size={18}
            />
            <input
              type="text"
              placeholder={
                activeTab === "chats"
                  ? "Search conversations..."
                  : "Search requests..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
              w-full pl-10 pr-3 py-2 rounded-lg
              bg-base-200 border border-base-300
              text-base-content placeholder:text-base-content/40
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              transition-all duration-200
            "
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-2">
          <div className="flex rounded-xl">
            <button
              onClick={() => {
                setActiveTab("chats");
                setSearchQuery("");
              }}
              className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
              transition-all duration-200 font-medium text-sm
              ${
                activeTab === "chats"
                  ? "bg-primary text-primary-content shadow-sm"
                  : "text-base-content/70 hover:text-base-content hover:bg-base-100"
              }
            `}
            >
              <MdChat size={18} />
              <span>Chats</span>
              {chats.filter((c) => c.unread > 0).length > 0 && (
                <span
                  className={`
                ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold
                ${
                  activeTab === "chats"
                    ? "bg-primary-content/20 text-primary-content"
                    : "bg-primary/20 text-primary"
                }
              `}
                >
                  {chats.filter((c) => c.unread > 0).length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("requests");
                setSearchQuery("");
              }}
              className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
              transition-all duration-200 font-medium text-sm
              ${
                activeTab === "requests"
                  ? "bg-primary text-primary-content shadow-sm"
                  : "text-base-content/70 hover:text-base-content hover:bg-base-100"
              }
            `}
            >
              <MdPersonAdd size={18} />
              <span>Requests</span>
              {requests.length > 0 && (
                <span
                  className={`
                ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold
                ${
                  activeTab === "requests"
                    ? "bg-primary-content/20 text-primary-content"
                    : "bg-primary/20 text-primary"
                }
              `}
                >
                  {requests.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {filteredUsers?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 rounded-2xl mt-0.5 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-content/20 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <AvatarSiderBar user={user} />
              {user?._id && onlineUsers.includes(user?._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {user?._id && getLastMessage(user._id)?.text}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers?.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
