export type Message = {
  _id?: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserType = {
  username?: string;
  _id?: string; // optional because Mongo creates it
  email: string;
  name: string;
  password: string;
  avatarUrl?: string; // optional because it has a default
  createdAt?: string;
  updatedAt?: string;
};
