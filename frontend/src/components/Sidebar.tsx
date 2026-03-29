import SidebarSkeleton from "./skeletons/SidebarSkeleton";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { AvatarSiderBar } from "./AvatarPlaceHolder";
import { useUsers } from "../hooks/useChat";
import { Users } from "lucide-react";
import type { Message } from "../util/types";
import SearchUsers from "./SearchUsers";

const Sidebar = () => {
  const { selectedUser, setSelectedUser, lastMessage } = useChatStore();
  const { data: users, isLoading: isUsersLoading } = useUsers();

  const { onlineUsers } = useAuthStore();

  if (isUsersLoading) return <SidebarSkeleton />;

  const getLastMessage = (userId: string): Message | null => {
    return lastMessage[userId] || null;
  };

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
        {users?.map((user) => (
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
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {user?._id && getLastMessage(user._id)?.text}
              </div>
            </div>
          </button>
        ))}

        {users?.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
