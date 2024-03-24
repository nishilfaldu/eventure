import { Modal, Select } from "antd";
import { useState } from "react";



interface EventData {
  name: string;
  category: string;
  date: string;
}

const { Option } = Select;

export function EventModal({ visible, onCancel, onSubmit }: { visible: boolean; onOk: () => void;
  onCancel: () => void; onSubmit: (eventData: EventData) => void; }) {
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

  const handleSubmit = () => {
    onSubmit(eventData);
    setEventData({ name: "", category: "", date: "" });
  };

  return (
    <Modal title="Create New Event" visible={visible} onOk={handleSubmit} onCancel={onCancel}>
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
