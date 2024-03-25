import { Input, Space, Table } from "antd";
import { useMutation } from "convex/react";
import { useCallback, useState } from "react";

import { api } from "../../../../convex/_generated/api";
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
import { toast } from "@/components/ui/use-toast";





const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "RSVP Status",
    dataIndex: "rsvp",
    key: "rsvp",
  },
];

interface Guest {
  name: string;
  email: string;
  phone: string;
}

interface GuestDialogProps {
  eventId: string;
}

// TODO: add z validation especially for emails and phone numbers
// TODO: make useState optimized for object {} storage setState((oldObj) => ({ ...oldObj, key: value }))

export function GuestDialog({ eventId }: GuestDialogProps) {
  const createGuest = useMutation(api.guests.createGuest);

  const [openModal, setOpenModal] = useState(false);

  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState<Guest>({ name: "", email: "", phone: "" });

  const handleAddGuest = useCallback(async () => {
    // setGuests([...guests, newGuest]);
    if(!newGuest.name || !newGuest.email || !newGuest.phone) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields",
      });

      return;
    }

    try {
      await createGuest({
        eventId: eventId,
        name: newGuest.name,
        email: newGuest.email,
        phoneNumber: newGuest.phone,
      });

      toast({
        title: "Add Guest",
        description: "Added new guest successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "There was an error while adding the guest",
      });
    }

    setNewGuest({ name: "", email: "", phone: "" });
  }, [createGuest, eventId, newGuest.email, newGuest.name, newGuest.phone]);

  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpenModal(true)}>Create a guest list</Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Create your guest list</DialogTitle>
          <DialogDescription>
            Add one guest at a time and send them emails about events
          </DialogDescription>
        </DialogHeader>
        <>
          <div>
            <Space>
              <div className="flex gap-x-2">
                <Input
                  placeholder="Name"
                  value={newGuest.name}
                  onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
                  required
                  className="w-full"
                  size="large"
                />
                <Input
                  placeholder="Email"
                  value={newGuest.email}
                  onChange={e => setNewGuest({ ...newGuest, email: e.target.value })}
                  required
                  size="large"

                />
                <Input
                  placeholder="Phone"
                  value={newGuest.phone}
                  onChange={e => setNewGuest({ ...newGuest, phone: e.target.value })}
                  required
                  size="large"
                />
              </div>
              <Button variant="default" onClick={handleAddGuest}>Add Guest</Button>
            </Space>
            <Table columns={columns} dataSource={guests} className="mt-4"/>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-medium">Ready to send RSVP requests?</h1>
            <h1 className="text-gray-600">
            Once you have a finalized guest list, we will send out RSVP requests for you.
            </h1>
            <Button variant="default" className="mt-2">Send RSVP Requests</Button>
          </div>

        </>
        <DialogFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
