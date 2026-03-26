import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { MdPersonAddAlt1 } from "react-icons/md";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { AvatarSiderBar } from "./AvatarPlaceHolder";
import { useUsers } from "../hooks/useChat";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { data: users, isLoading: isUsersLoading } = useUsers();

  const { onlineUsers } = useAuthStore();

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5.5">
        <div className="flex items-center justify-between">
          <div className="flex ">
            <Users className="size-6 hidden sm:block" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
          <button title="add new contact">
            <MdPersonAddAlt1 size={25} />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
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
                {user?._id && onlineUsers.includes(user?._id)
                  ? "Online"
                  : "Offline"}
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
