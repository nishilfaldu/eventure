"use client";
import { Card, Modal, Tabs, Select } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import no_event from "@/public/assets/no_event.png";



interface EventData {
  name: string;
  category: string;
  date: string;
}

const { Option } = Select;

export default function MyEvents() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEventSubmit = (eventData: EventData) => {
    setEvents([...events, eventData]);
    handleOk();
  };

  return (
    <div className="w-full h-full relative bg-white">
      <div className="text-black text-5xl font-medium break-words pt-6">My Events</div>
      <div className="flex justify-between items-center">
        <div className="relative text-gray-600 text-2xl font-medium break-words">
          Hey there, welcome to Eventure!
        </div>
        <div className="relative p-3 rounded-lg bg-blue-800 text-white text-base break-words cursor-pointer" onClick={showModal}>
          Create new event
        </div>
      </div>

      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="large"
            items={new Array(2).fill(null).map((_, i) => {
              const id = String(i);
              const names = ["Past Events", "Upcoming Events"];

              return {
                label: `${names[i]}`,
                key: id,
                children: <EventCards events={events} index={i} />,
              };
            })}
          />
        </main>
      </div>

      <EventModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} onSubmit={handleEventSubmit} />
    </div>
  );
}

function EventModal({ visible, onOk, onCancel, onSubmit }: { visible: boolean; onOk: () => void;
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
        <label className="block"> Event Name</label>
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

function EventCards({ events, index }: { events: EventData[]; index: number }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {events.length === 0 && index === 1 ? (
        <div className="col-span-4 flex justify-center items-center">
          <Image src={no_event} alt="No events yet."/>
        </div>
      ) : (
        events.map((event, idx) => (
          <div key={idx}>
            <Link href={`/myEvents/${idx + 1}`}>
              <Card style={{ width: 300 }}
                cover={// eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="example"
                    src="https://creativesilhouettes.ca/wp-content/uploads/2021/07/pink-magnolia-flower_pattern.jpg"
                  />}>
                <Meta title={event.name} description={event.date} />
              </Card>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
