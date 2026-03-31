import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <div className="hidden sm:block">
              <Sidebar />
            </div>
            <div className="block sm:hidden">
              {!selectedUser && <Sidebar />}
            </div>
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
