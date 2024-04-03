"use client";

import { useMutation } from "convex/react";
import type { ReactNode } from "react";
import { createContext, useEffect, useRef, useState } from "react";
import type { SignalData } from "simple-peer";
import Peer from "simple-peer";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import type { Socket } from "socket.io-client";

import { api } from "../../../../convex/_generated/api";
import { useUserStore } from "../UserStoreProvider";
import { toast } from "@/components/ui/use-toast";
import socketClient from "@/lib/socketClient";


// Define types for the context and peer connection
type SocketContextType = {
  call: {
    isReceivingCall?: boolean;
    from?: string;
    name?: string;
    signal?: string | SignalData;
  };
  callAccepted: boolean;
  myVideo: React.RefObject<HTMLVideoElement>;
  userVideo: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  //   whoAnswered: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

type SocketContextProviderProps = {
  children: ReactNode;
};


function SocketContextProvider({ children }: SocketContextProviderProps) {
  const userId = useUserStore(state => state.userId);
  const userFullname = useUserStore(state => state.userFullname);
  const storeSocketId = useMutation(api.users.storeSocketId);

  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [name, setName] = useState<string>("");
  //   const [whoAnswered, setWhoAnswered] = useState<string>("");
  const [call, setCall] = useState<{
    isReceivingCall?: boolean;
    from?: string;
    name?: string;
    signal?: SignalData | string;
  }>({});
  const [me, setMe] = useState<string>("");

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | undefined>(undefined);
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);



  // Initialize the socket instance only once
  useEffect(() => {
    socketRef.current = socketClient(userId);

    // Listen for the "connect" event
    socketRef.current.on("connect", async () => {
      // Access the socket id after the connection is established
      const socketId = socketRef.current?.id;
      if (!socketId) {
        toast({
          title: "Error",
          description: "Socket ID not found",
        });

        return;
      }
      // Store the socket id in your database
      await storeSocketId({ socketId });
    });

    return () => {
    // Clean up socket when component unmounts
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, storeSocketId]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream);
        if(myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socketRef.current?.on("me", (id: string) => {
      setMe(id);
      setName(userFullname);
    });

    socketRef.current?.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [userFullname]);

  const answerCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream);
        if(myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", data => {
      // answering rishi
    //   console.log("answerCall emit - receiver", { signalData: data, to: call.from, whoAnswered: name });
      socketRef.current?.emit("answerCall", { signal: data, to: call.from, whoAnswered: name });
    });

    peer.on("stream", (currentStream : MediaStream) => {
      if(userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    // TODO: remove exclamation mark
    peer.signal(call.signal!);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream);
        // console.log("hello mike test 2");
        // console.log(myVideo.current, "myvideo current");
        // myVideo.current.srcObject = currentStream;
        if(myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
    const peer = new Peer({ initiator: true, trickle: false, stream });
    // console.log(id, "id in context");

    peer.on("signal", data => {
    //   console.log("data in signal", data);
    //   console.log("me", me);
    //   console.log("callUser emit - caller", { userToCall: id, signalData: data, from: me, name });
      socketRef.current?.emit("callUser", { userToCall: id, signalData: data, from: me, name });
    });

    peer.on("stream", (currentStream : MediaStream) => {
      if(userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    // TODO: I had whoAnswered here!
    socketRef.current?.on("callAccepted", signal => {
      setCallAccepted(true);
      //   console.log("callAccepted signal - caller", signal, whoAnswered);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();

    // window.location.reload();
  };

  return(
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    //   whoAnswered,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContextProvider, SocketContext };
