import { create } from "zustand";
import type { UserType, Message } from "../util/types";
import { useAuthStore } from "./useAuthStore";
import { QueryClient } from "@tanstack/react-query";

interface IChatStore {
  selectedUser: UserType | null;

  setSelectedUser: (user: UserType | null) => void;

  subscribeToMessages: (queryClient: QueryClient) => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  selectedUser: null,

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  subscribeToMessages: (queryClient) => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage: Message) => {
      const isFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isFromSelectedUser) return;

      // 🔥 Update TanStack cache instead of Zustand
      queryClient.setQueryData<Message[]>(
        ["messages", selectedUser._id],
        (old = []) => [...old, newMessage]
      );
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));