import { VideoIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { SocketContext } from "./SocketContext";
import { VideoPlayer } from "./VideoPlayer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



interface VideoDialogProps {
  userToCallId: string | undefined;
  calleeNameOnCallerSide: string;
}

export function VideoDialog({ userToCallId, calleeNameOnCallerSide }: VideoDialogProps) {
  const [openModal, setOpenModal] = useState(false);
  const { callAccepted, leaveCall, callUser } = useContext(SocketContext);

  // Effect to listen for call acceptance
  useEffect(() => {
    if (callAccepted) {
      setOpenModal(true); // Open the modal when the call is accepted
    }
  }, [callAccepted]);

  return(
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <Button className="rounded-full w-8 h-8" size="icon" variant="ghost"
          onClick={() => {
            setOpenModal(true);
            if (!userToCallId) { return; }
            callUser(userToCallId);
          }
          }>
          <VideoIcon className="h-4 w-4" />
          <span className="sr-only">Start video call</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Call</DialogTitle>
          <DialogDescription>
              This is a new feature and can cause some issues in high traffic. Please be patient.
          </DialogDescription>
        </DialogHeader>

        <VideoPlayer calleeNameOnCallerSide={calleeNameOnCallerSide}/>
        {/* Conditionally render the VideoPlayer based on call acceptance */}
        {/* {callAccepted ? <VideoPlayer /> : "Waiting for call to be accepted..."} */}

        <DialogFooter>
          <Button type="button" onClick={() => {
            setOpenModal(false);
            leaveCall();
          }}
          >End Call</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
