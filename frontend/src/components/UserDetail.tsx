
import { getInitials } from "./AvatarPlaceHolder.js";
import { IoMail, IoCalendar, IoInformation, IoClose } from "react-icons/io5";
import { formatTimeStamp } from "../util/formatTimeStamp.js";
import type { UserType } from "../util/types.js";

interface UserDetailProps {
  onClose?: () => void;
  isMobile?: boolean;
  user: UserType;
  className?: string;
}

const UserDetail = ({
  onClose,
  isMobile = false,
  user,
  className = "",
}: UserDetailProps) => {

  if (!user) {
    return (
      <div
        className={`${isMobile ? "w-full" : "w-80"} h-full bg-base-100 border-l border-base-200 flex flex-col`}
      >
        <div className="p-4 border-b border-base-200 flex justify-between items-center">
          <h3 className="font-semibold self-center">User Details</h3>
          {onClose && (
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              <IoClose size={20} />
            </button>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-base-content/60">
            <IoInformation size={48} className="mx-auto mb-2 opacity-50" />
            <p>No user selected</p>
          </div>
        </div>
      </div>
    );
  }

  const isOnline = false;
  const lastSeen = new Date().toLocaleString(); // Placeholder for last seen time
  const memberSince = user?.createdAt;

  return (
    <div
      className={`${isMobile ? "w-full" : "w-80"}  h-full flex flex-col overflow-y-auto ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-base-200 sticky top-0 bg-base-100 z-10">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">User Details</h3>
          {onClose && (
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              <IoClose size={20} />
            </button>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="flex-1">
        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center border-b border-base-200">
          <div className="avatar online mb-4">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center text-3xl text-white font-semibold">
                  {getInitials(user.name)}
                </div>
              )}
            </div>
          </div>

          <h2 className="text-xl font-bold text-center">{user.name}</h2>

          <p className="text-sm text-base-content/60 mt-1">@{user.username}</p>

          <div className="mt-3 flex items-center gap-2">
            <div
              className={`badge ${isOnline ? "badge-success" : "badge-ghost"} gap-1`}
            >
              <div
                className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
              ></div>
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>

          {!isOnline && lastSeen && (
            <p className="text-xs text-base-content/50 mt-2">
              Last seen {formatTimeStamp(lastSeen)}
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="p-4 space-y-4 border-b border-base-200">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-base-content/60">
            Contact Information
          </h4>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <IoMail className="text-base-content/60" size={18} />
              <span className="text-base-content">{user.email}</span>
            </div>

            {memberSince && (
              <div className="flex items-center gap-3 text-sm">
                <IoCalendar className="text-base-content/60" size={18} />
                <span className="text-base-content">
                  Joined {formatTimeStamp(memberSince)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {/* <div className="p-4 border-b border-base-200">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-3">
            Statistics
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-base-200 rounded-lg p-3 text-center">
              <IoChatbubble className="mx-auto mb-1 text-primary" size={20} />
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-base-content/60">Messages</div>
            </div>

            <div className="bg-base-200 rounded-lg p-3 text-center">
              <IoImage className="mx-auto mb-1 text-primary" size={20} />
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-base-content/60">Media</div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-base-200 sticky bottom-0 bg-base-100">
        <div className="flex gap-2">
          <button className="btn btn-primary flex-1">Add Contact</button>
          <button className="btn btn-outline btn-error flex-1">
            Block User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
