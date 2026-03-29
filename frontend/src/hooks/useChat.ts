import { fetchMessages, sendMessage } from "../api/chat.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import type { UserType } from "../util/types";

export const useMessages = (userId?: string) => {
  return useQuery({
    queryKey: ["messages", userId],
    queryFn: () => fetchMessages(userId!),
    enabled: !!userId,
  });
};


export const useUsers = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await axiosInstance.get<UserType[]>("/messages/users");
      return res.data;
    },
  });
};


export const useSendMessage = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => sendMessage(userId!, data),

    onSuccess: (newMessage) => {
      queryClient.setQueryData(["messages", userId], (old: any[] = []) => [
        ...old,
        newMessage,
      ]);
    },
  });
};
