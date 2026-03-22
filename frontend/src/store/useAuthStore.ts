import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { UserType } from "../util/types";
import { io, type Socket } from "socket.io-client";
interface IUseAuthStore {
  authUser: UserType | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];

  checkAuth: () => Promise<void>;
  signup: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { profilePic: string }) => Promise<void>;
  connectSocket: () => void;
  disConnectSocket: () => void;
  socket: Socket | null;
}

const BASE_URL = import.meta.env.VITE_BASE_URL.replace("/api", "");
export const useAuthStore = create<IUseAuthStore>((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<UserType>("/auth/check");
      set({ authUser: res.data });

      //connect socket
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post<UserType>("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");

      //connect socket
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<UserType>("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Successfully logged in");

      //connect socket
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

      //disconnect socket
      get().disConnectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put<UserType>(
        "/auth/update-profile",
        data,
      );
      set({ authUser: res.data });
      toast.success("Profile updated");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    //if theres no user, dont connect, if socket connected, dont connect
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, { query: { userId: authUser._id } });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disConnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },
}));
