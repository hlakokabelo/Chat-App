import { useEffect } from "react";
import Navbar from "./components/Navbar.js";
import NotFountPage from "./pages/NotFountPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import LoginPage from "./pages/LoginPage.js";
import SettingsPage from "./pages/SettingsPage.js";
import Home from "./pages/Home.js";
import ProfilePage from "./pages/ProfilePage.js";
import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import SignedInLayout from "./layout/SignedInLayout.js";
import SignedOutLayout from "./layout/SignedOutLayout.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { authUser, onlineUsers, isCheckingAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center min-h-screen">
        <span className="loading mt-[50vh] loading-spinner loading-xl"></span>
      </div>
    );
  }
  console.log({ onlineUsers });
  return (
    <div data-theme={theme} className="overflow-auto">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />

        <Route element={<SignedInLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<SignedOutLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="*" element={<NotFountPage />} />
      </Routes>
    </div>
  );
}

export default App;
