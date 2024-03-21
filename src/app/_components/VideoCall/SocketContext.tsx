"use client";

import type { ReactNode } from "react";
import { createContext, useEffect, useRef, useState } from "react";
import type { SignalData } from "simple-peer";
import Peer from "simple-peer";
import { io } from "socket.io-client";


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
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

type SocketContextProviderProps = {
  children: ReactNode;
};

const socket = io("http://localhost:3001");

function SocketContextProvider({ children }: SocketContextProviderProps) {
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [name, setName] = useState<string>("");
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

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream);

        if(myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on("me", id => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", data => {
      socket.emit("answerCall", { signal: data, to: call.from });
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
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", data => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: me, name });
    });

    peer.on("stream", (currentStream : MediaStream) => {
      if(userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on("callAccepted", signal => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();

    window.location.reload();
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
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContextProvider, SocketContext };
