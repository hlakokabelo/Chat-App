import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

import ChatHeader from "./ChatHeader.js";
import MessageInput from "./MessageInput.js";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { AvatarChat } from "./AvatarPlaceHolder.js";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  const isMyMessage = (senderId: string): boolean => {
    return senderId === authUser?._id;
  };

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser?._id);
  }, [selectedUser?._id, getMessages]);

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
        {messages.length > 0 &&
          messages.map((message) => (
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
                <time className="text-xs opacity-50 ml-1">
                  {message?.createdAt && formatMessageTime(message?.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col max-w-100">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-60 rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
