import { useUser } from "@clerk/nextjs";
import type { TableProps } from "antd";
import { Input, Space, Table } from "antd";
import { useMutation, useQuery } from "convex/react";
import { Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

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
import type { Id } from "convex/_generated/dataModel";



interface DataType {
  name: string;
  email: string;
  phone: string;
  rsvp: string;
  _id: Id<"guests">;
}



interface Guest {
  _id: Id<"guests">;
  _creationTime: number;
  email: string;
  phoneNumber: string;
  name: string;
  eventId: Id<"events">;
  registered: boolean;
}[];

interface GuestDialogProps {
  eventId: string;
  guests: Guest[];
}

interface GuestState {
  name: string;
  email: string;
  phone: string;
}

// TODO: add z validation especially for emails and phone numbers
// TODO: make useState optimized for object {} storage setState((oldObj) => ({ ...oldObj, key: value }))

export function GuestDialog({ eventId, guests }: GuestDialogProps) {
  const createGuest = useMutation(api.guests.createGuest);
  const deleteGuest = useMutation(api.guests.deleteGuestById);
  const event = useQuery(api.events.getEventById, { id: eventId as Id<"events"> });
  const { user } = useUser();

  const [openModal, setOpenModal] = useState(false);

  //   const [guests, setGuests] = useState<GuestState[]>([]);
  const [newGuest, setNewGuest] = useState<GuestState>({ name: "", email: "", phone: "" });

  const handleDeleteGuest = useCallback(async (guestId: Id<"guests">) => {
    try {
      await deleteGuest({ guestId });
      toast({
        title: "Delete Guest",
        description: "Deleted guest successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "There was an error while deleting the guest",
      });
    }
  }, [deleteGuest]);

  const columns : TableProps<DataType>["columns"] = useMemo(() =>
    [
      {
        dataIndex: "id",
        key: "_id",
      },
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
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Button variant={"ghost"} onClick={() => handleDeleteGuest(record._id)}>
            <Trash />
          </Button>
        ),
      },
    ], [handleDeleteGuest]);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendRSVP = async (e : any) => {
    console.log("i ran");
    e.preventDefault();
    // const submitData = { registerHref: "www.google.com", contactEmail: "faldund@mail.uc.edu", contactPhone: "+15130987654",
    //   eventDate: "12/24/2024", eventLocation: "California", eventName: "Christmas Party", guestName: "Zeno",
    //   toEmail: guests[0].email };

    const data = guests.map(guest => ({
      from: "Eventure <noreply@eventure.network>",
      toEmail: guest.email,
      subject: "You are invited",
      guestName: guest.name,
      eventDate: event.date,
      eventLocation: "Cincinnati, OH",
      eventName: event.name,
      contactEmail: user?.primaryEmailAddress?.toString(),
      contactPhone: user?.primaryPhoneNumber?.phoneNumber,
      registerHref: `${process.env.NEXT_PUBLIC_SERVER_URL}/guest/${guest._id}`,
    }));


    try {
      fetch("http://localhost:3000/api/send",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      }).then(res => {
        if(res.ok) {
          toast({
            title: "RSVP Emails",
            description: "Sent RSVP requests successfully",
          });
        }else{
          toast({
            title: "Error",
            description: "There was an error while sending RSVP requests",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddGuest = useCallback(async () => {
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
            <Table columns={columns} dataSource={
              guests.map(guest => ({
                name: guest.name,
                email: guest.email,
                phone: guest.phoneNumber,
                rsvp: guest.registered ? "Yes" : "No",
                _id: guest._id,
                key: guest._id, // Unique key for each row. Needed for React to identify each row, especially if the data is updated.
              }))
            } pagination={{ defaultPageSize: 5 }} className="mt-4"/>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-medium">Ready to send RSVP requests?</h1>
            <h1 className="text-gray-600">
            Once you have a finalized guest list, we will send out RSVP requests for you.
            </h1>
            <Button variant="default" className="mt-2" onClick={sendRSVP}>Send RSVP Requests</Button>
          </div>

        </>
        <DialogFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
