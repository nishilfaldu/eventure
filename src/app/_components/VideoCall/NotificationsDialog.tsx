import { useContext } from "react";

import { SocketContext } from "./SocketContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



export function NotificationsDialog() {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return(
    <Dialog open={call.isReceivingCall && !callAccepted}>
      {/* <DialogTrigger asChild>
        <Button className="rounded-full w-8 h-8" size="icon" variant="ghost">
          <VideoIcon className="h-4 w-4" />
          <span className="sr-only">Start video call</span>
        </Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{call.name} is calling...</DialogTitle>
          <DialogDescription>
              You can choose to accept or decline the call.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-around gap-x-2">
            {/* <Button variant="default" onClick={leaveCall}>Reject</Button> */}
            <Button variant="default" onClick={() => {
              answerCall();
            }}>Answer</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
