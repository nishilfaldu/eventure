"use client";

import { Tabs } from "antd";
import { useState } from "react";

import { EventGrid } from "./EventGrid";
import { EventModal } from "./EventModal";
import { Button } from "@/components/ui/button";



interface EventData {
  name: string;
  category: string;
  date: string;
}

const eventTabsInfo = [
  {
    label: "Past Events",
    key: "1",
    children: <EventGrid timeline="past"/>,
  },
  {
    label: "Upcoming Events",
    key: "2",
    children: <EventGrid timeline="upcoming"/>,
  },
];

export function EventHeader() {
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

  return(
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-600 text-2xl font-medium break-words">
            Hey there, welcome to Eventure!
        </div>
        <Button onClick={showModal} className="p-3 text-base">Create new event</Button>
      </div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        items={
          eventTabsInfo.map(({ label, key, children }) => ({
            label,
            key,
            children,
          }))
        }
      />
      <EventModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} onSubmit={handleEventSubmit}/>
    </div>
  );
}