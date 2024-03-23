/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

import type { Id } from "convex/_generated/dataModel";



const PORT = 8080;
export default function socketClient(userId: Id<"users">) {
//   const socket = io(`:${PORT}`, { path: "/api/socket", addTrailingSlash: false });
  console.log("userId in socketClient", userId);
  const socket = io(`:${PORT}`);

  socket.on("connect", async () => {
    console.log("Connected");
    // Emit custom event along with user ID
    socket.emit("userConnected", { userId });
    // await fetch("/api/socket");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  socket.on("connect_error", async (err: any) => {
    console.log(`connect_error due to ${err.message}`);
  });

  return socket;
}
