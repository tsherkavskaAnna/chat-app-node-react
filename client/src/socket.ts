import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Connected to Socket.IO server, id:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected:", reason);
});
