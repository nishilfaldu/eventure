// pages/api/socket.ts
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";

// import { PORT } from "@/config/app";


const PORT = 3001;

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}
export async function GET(_req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    res.status(200).json({ success: true, message: "Socket is already running", socket: `:${PORT}` });

    return;
  }

  console.log("Starting Socket.IO server on port:", PORT);
  const io = new Server(res.socket.server, { path: "/api/socket", addTrailingSlash: false, cors: { origin: "*" } }).listen(PORT);

  io.on("connection", socket => {
    console.log("socket connect", socket.id);

    // emit id to client
    socket.emit("me", socket.id);

    // disconnect call
    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    // call user
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    // answer call
    socket.on("answerCall", data => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    // socket.broadcast.emit("welcome", `Welcome ${socket.id}`);
    // socket.on("disconnect", async () => {
    //   console.log("socket disconnect");
    // });
  });

  res.socket.server.io = io;
  res.status(201).json({ success: true, message: "Socket is started", socket: `:${PORT}` });
}
