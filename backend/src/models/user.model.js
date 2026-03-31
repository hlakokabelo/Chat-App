import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  bio: String,
  name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  lastSeen: Date,
  status: {
    type: String,
    enum: ["online", "offline", "typing"],
    default: "offline",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
