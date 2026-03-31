import { useChatStore } from "../store/useChatStore";
import { use, useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader.js";
import MessageInput from "./MessageInput.js";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { AvatarChat } from "./AvatarPlaceHolder.js";
import { useMessages } from "../hooks/useChat.js";
import { formatTimeStamp } from "../util/formatTimeStamp.js";
import UserDetail from "./UserDetail.js"; // Import the new component

const ChatContainer = () => {
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const { data: messages, isLoading: isMessagesLoading } = useMessages(
    selectedUser?._id,
  );
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [showUserDetail, setShowUserDetail] = useState(false);

  const isMyMessage = (senderId: string): boolean => {
    return senderId === authUser?._id;
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);


  useEffect(() => {
    // Close user detail sidebar when switching to a different chat
    setShowUserDetail(false);
  }, [selectedUser]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex">
      <div className="flex-1 flex flex-col">
        <div onClick={() => setShowUserDetail((prev) => !prev)}>
          <ChatHeader />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages &&
            messages?.length > 0 &&
            messages?.map((message, index) => {
              const isLast = index === messages.length - 1;

              return (
                <div
                  key={message._id}
                  className={`chat ${isMyMessage(message.senderId) ? "chat-end" : "chat-start"}`}
                >
                  <div className=" chat-image avatar">
                    {isMyMessage(message.senderId)
                      ? authUser && <AvatarChat user={authUser} />
                      : selectedUser && <AvatarChat user={selectedUser} />}
                  </div>
                  <div className="chat-header mb-1">
                    <time className={`"text-xs opacity-50 ml-1`}>
                      {message?.createdAt &&
                        formatTimeStamp(message?.createdAt)}
                    </time>
                  </div>

                  <div
                    className={`
                        chat-bubble flex flex-col max-w-100
                          ${isMyMessage(message.senderId) ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-60 rounded-md"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>

                  {isLast && <div ref={messageEndRef} />}
                </div>
              );
            })}
        </div>

        <MessageInput />
      </div>

      {/* User Detail Sidebar */}
      {showUserDetail && (
        <>
          {/* Mobile overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowUserDetail(false)}
          />
          <div className="fixed right-0 top-0 h-full z-50 lg:relative lg:z-auto">
            <UserDetail
            className="border-l-primary border-2 rounded-2xl border-transparent"
              user={selectedUser!}
              onClose={() => setShowUserDetail(false)}
              isMobile={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatContainer;
