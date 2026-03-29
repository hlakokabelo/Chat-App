import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader.js";
import MessageInput from "./MessageInput.js";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { AvatarChat } from "./AvatarPlaceHolder.js";
import { useMessages } from "../hooks/useChat.js";
import { formatTimeStamp } from "../util/formatTimeStamp.js";

const ChatContainer = () => {
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const { data: messages, isLoading: isMessagesLoading } = useMessages(
    selectedUser?._id,
  );
  const messageEndRef = useRef<HTMLDivElement>(null);
  const isMyMessage = (senderId: string): boolean => {
    return senderId === authUser?._id;
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

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
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

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
                    {message?.createdAt && formatTimeStamp(message?.createdAt)}
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
  );
};
export default ChatContainer;
