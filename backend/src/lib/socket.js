import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

/** gets socket of reciever
 * to emit a message to
 * the reciever */
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {}; //userId:socketId

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];

    //sending the keys, whic are userIds
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    console.log("-".repeat(25),"Online users:",Object.keys(userSocketMap).length)
  });
    console.log("-".repeat(25),"Online users:",Object.keys(userSocketMap).length)

});

export { io, app, server };
