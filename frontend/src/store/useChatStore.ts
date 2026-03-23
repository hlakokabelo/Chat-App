import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { Message, UserType } from "../util/types";
import { useAuthStore } from "./useAuthStore";

interface IChatStore {
  messages: Message[];
  users: UserType[];
  selectedUser: UserType | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  sendMessage: (messageData: any) => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: UserType | null) => void;
  subScribeToMessages: () => void;
  unSubScribeFromMessages: () => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get<UserType[]>("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post<Message>(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );

      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<Message[]>(`/messages/${userId}`);

      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  subScribeToMessages: () => {
    //gets current value, socket val won't
    //change. if socket is updated

    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage) => {
      const isMsgSentFromSelUser =
        newMessage.senderId === selectedUser._id;
      if (!isMsgSentFromSelUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },
  unSubScribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket?.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
