"use client";

import { useState } from "react";

import { EventModal } from "./EventModal";
import { Button } from "@/components/ui/button";



interface EventData {
  name: string;
  category: string;
  date: string;
}

export function EventHeader({ children }: { children: React.ReactNode}) {
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
    <>
      <div className="flex justify-between items-center">
        <div className="text-gray-600 text-2xl font-medium break-words">
            Hey there, welcome to Eventure!
        </div>
        <Button onClick={showModal} className="p-3 text-base">Create new event</Button>
      </div>
      {children}

      <EventModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} onSubmit={handleEventSubmit}/>
    </>
  );
}
