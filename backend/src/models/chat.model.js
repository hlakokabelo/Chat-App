import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  isGroup: { type: Boolean, default: false },
  name: { type: String ,default: null}, // null for DMs

  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    lastReadMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  }],

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
}, { timestamps: true });

export const Chat = mongoose.model("Chat", chatSchema);