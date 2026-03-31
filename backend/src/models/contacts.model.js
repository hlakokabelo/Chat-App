import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  status: {
    type: String,
    enum: ["pending", "accepted", "blocked"],
    default: "pending",
  },
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);