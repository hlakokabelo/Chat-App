import { create } from "zustand";
import type { UserType, Message } from "../util/types";
import { useAuthStore } from "./useAuthStore";
import { QueryClient } from "@tanstack/react-query";

interface IChatStore {
  selectedUser: UserType | null;
  setSelectedUser: (user: UserType | null) => void;
  subscribeToMessages: (queryClient: QueryClient) => void;
  unsubscribeFromMessages: () => void;
  lastMessage: Record<string, Message | null>;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  selectedUser: null,
  lastMessage: {},
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  subscribeToMessages: (queryClient) => {
    const socket = useAuthStore.getState().socket;

    socket?.on("new-message", (newMessage: Message) => {
      queryClient.setQueryData<Message[]>(
        ["messages", newMessage.senderId],
        (old = []) => [...old, newMessage],
      );
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("new-message");
  },
}));
