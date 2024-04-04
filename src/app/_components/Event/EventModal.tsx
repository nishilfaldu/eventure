import { Modal, Select } from "antd";
import { useMutation } from "convex/react";
import dayjs from "dayjs";
import { useState } from "react";

import { api } from "../../../../convex/_generated/api";
import { useUserStore } from "../UserStoreProvider";
import { toast } from "@/components/ui/use-toast";


// TODO: add z.validation after the functionality has been implemented

interface EventData {
  name: string;
  category: string;
  date: string;
}

interface EventModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const { Option } = Select;

export function EventModal({ visible, onCancel, onSubmit }: EventModalProps) {
  const { userId } = useUserStore(state => state);
  const createEvent = useMutation(api.events.createEvent);

  const [eventData, setEventData] = useState<EventData>({ name: "", category: "", date: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setEventData(prevData => ({
      ...prevData,
      category: value,
    }));
  };

  const handleSubmit = async () => {
    if(!eventData.category || !eventData.date || !eventData.name) {
      toast({
        title: "Missing Fields",
        description: (
          <pre className="mt-2 rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Please fill all the fields to submit the form
            </code>
          </pre>
        ),
      });

      return;
    }
    const accountData = await createEvent({
      name: eventData.name,
      type: eventData.category,
      date: dayjs(eventData.date).format("MM/DD/YYYY"),
      userId: userId,
    });
    toast({
      title: accountData ? "Successful Response" : "Failed Response",
      description: (
        <pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {accountData ? "Your event has been added" : "Failed to add an event"}
          </code>
        </pre>
      ),
    });
    onSubmit();
    setEventData({ name: "", category: "", date: "" });
  };

  return (
    <Modal title="Create New Event" visible={visible} onOk={handleSubmit} onCancel={onCancel} okButtonProps={{ style: { backgroundColor: "black" } }}>
      <div>
        <label className="block">Event Name</label>
        <input type="text" name="name" value={eventData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-4" />
      </div>
      <div className="w-full">
        <label className="block">Category:</label>
        <Select
          style={{ width: "100%" }}
          placeholder="Select an event category"
          value={eventData.category}
          onChange={handleCategoryChange}
        >
          <Option value="Birthday">Birthday</Option>
          <Option value="Anniversary">Anniversary</Option>
          <Option value="Baby Shower">Baby Shower</Option>
          <Option value="Fundraiser">Fundraiser</Option>
          <Option value="Gala">Gala</Option>
          <Option value="Networking">Networking</Option>
        </Select>
      </div>
      <br/>
      <div>
        <label className="block">Date</label>
        <input type="date" name="date" value={eventData.date} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-4" />
      </div>
    </Modal>
  );
}
