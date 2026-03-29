import type { UserType } from "../util/types";

export interface IAvatarPlaceHolderProps {
  user: UserType;
}

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/) // split by spaces (handles multiple spaces too)
    .slice(0, 3)
    .map((word) => word[0]) // take first letter of each word
    .join("")
    .toUpperCase();
}
const InitialsComponent = ({ name }: { name: string }) => {
  return (
    <div className="avatar avatar-placeholder">
      <div className="bg-neutral text-neutral-content w-12 rounded-full">
        <span>{getInitials(name)}</span>
      </div>
    </div>
  );
};

export function AvatarChat({ user }: IAvatarPlaceHolderProps) {
  return user.profilePic ? (
    <div className="size-10 rounded-full border">
      <img src={user?.profilePic || "/avatar.png"} alt="profile pic" />
    </div>
  ) : (
    <InitialsComponent name={user.fullName} />
  );
}

export function AvatarSiderBar({ user }: IAvatarPlaceHolderProps) {
  return user.profilePic ? (
    <img
      src={user.profilePic || "/avatar.png"}
      alt={user?.fullName}
      className="size-12 object-cover rounded-full"
    />
  ) : (
    <InitialsComponent name={user.fullName} />
  );
}
