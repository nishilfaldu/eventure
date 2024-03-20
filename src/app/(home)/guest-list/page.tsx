"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Input, Button, Space } from "antd";
import Link from "next/link";
import React, { useState } from "react";



interface Guest {
  name: string;
  email: string;
  phone?: string;
}

export default function guestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState<Guest>({ name: "", email: "", phone: "" });

  const handleAddGuest = () => {
    setGuests([...guests, newGuest]);
    setNewGuest({ name: "", email: "", phone: "" });
  };

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
  ];

  return (
    <>
      <div className="text-black text-3xl font-medium break-words pt-6">Create your Guest List</div>
      <div className="relative text-gray-600 text-xl font-medium break-words">
        Add people to your guest list and we’ll do the rest!
      </div>
      <br/>
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Name"
            value={newGuest.name}
            onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
            required
            style={{ width: 200 }}
          />
          <Input
            placeholder="Email"
            value={newGuest.email}
            onChange={e => setNewGuest({ ...newGuest, email: e.target.value })}
            required
            style={{ width: 200 }}
          />
          <Input
            placeholder="Phone (optional)"
            value={newGuest.phone}
            onChange={e => setNewGuest({ ...newGuest, phone: e.target.value })}
            style={{ width: 200 }}
          />
          <Button className="bg-blue-800" type="primary" onClick={handleAddGuest} icon={<PlusOutlined />}>
          Add Guest
          </Button>
        </Space>
        <Table columns={columns} dataSource={guests} style={{ marginTop: 16 }} />
      </div>
      <br/>
      <div className="text-black text-2xl font-medium break-words pt-6">Ready to send RSVP requests?</div>
      <div className="flex justify-between items-center">
        <div className="relative text-gray-600 text-xl font-medium break-words">
        Once you have a finalized guest list, we will send out RSVP requests for you.
        </div>
        <Link href="/track-rsvp">
          <div className="relative p-3 rounded-lg bg-blue-800 text-white text-base break-words">
        Send RSVP Requests
          </div></Link>
      </div>
    </>
  );
}
