"use client";
import { Select } from "antd";
import React from "react";



const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const Options: React.FC = () => (
  <Select
    style={{ width: 492, height: 30, left: 25, top: 37, position: "relative", background: "white" }}
    showSearch
    placeholder="Select an event"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        label: "Birthday",
        value: "Birthday",
      },
      {
        label: "Anniversary",
        value: "Anniversary",
      },
      {
        label: "Baby Shower",
        value: "Baby Shower",
      },
      {
        label: "Fundraiser",
        value: "Fundraiser",
      },
      {
        label: "Gala",
        value: "Gala",
      },
      {
        label: "Networking",
        value: "Networking",
      },
    ]}
  />
);

export default Options;
