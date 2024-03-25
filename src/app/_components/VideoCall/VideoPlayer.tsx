import { useContext } from "react";

import { SocketContext } from "./SocketContext";



export function VideoPlayer({ calleeNameOnCallerSide }: {calleeNameOnCallerSide: string}) {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  //   console.log(name, "name and call in VP", call);
  //   console.log(myVideo, "myVideo in VP");
  //   console.log(stream, "stream in VP", myVideo);
  //   console.log(whoAnswered, "whoAnswered in VP");

  return (
    <div className="grid">
      {stream && (
        <div>
          <h1>{name || "Name not defined"}</h1>
          <video playsInline muted ref={myVideo} autoPlay className="w-[550px]"/>
        </div>
      )}
      {callAccepted && !callEnded && (
        <div>
          <h1>{call.name || calleeNameOnCallerSide || "Name not defined"}</h1>
          <video playsInline ref={userVideo} autoPlay className="w-[550px]"/>
        </div>
      )}
    </div>
  );
}
