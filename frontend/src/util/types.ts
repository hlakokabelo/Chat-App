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
  _id?: string; // optional because Mongo creates it
  email: string;
  fullName: string;
  password: string;
  profilePic?: string; // optional because it has a default
  createdAt?: string;
  updatedAt?: string;
};
