import { axiosInstance } from "../lib/axios";
import type { Message, UserType } from "../util/types";

export const fetchUsers = async (): Promise<UserType[]> => {
  const res = await axiosInstance.get("/messages/users");
  return res.data;
};

export const fetchMessages = async (
  userId: string
): Promise<Message[]> => {
  const res = await axiosInstance.get(`/messages/${userId}`);
  return res.data;
};

export const sendMessage = async (
  userId: string,
  messageData: any
): Promise<Message> => {
  const res = await axiosInstance.post(
    `/messages/send/${userId}`,
    messageData
  );
  return res.data;
};