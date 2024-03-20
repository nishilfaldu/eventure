"use client";
import type { CheckboxProps } from "antd";
import { Checkbox } from "antd";
// import { Input } from "antd";
import { List } from "antd";



const guests = [
  "Create a guest list",
  "Make invitations",
  "Send invitations",
  "Track RSVP",
];

const decorations= [
  "Balloons",
  "Flowers",
  "Banners and Posters",
  "Table Decoration",
  "Wall Decorations",
  "Lighting",
  "Personalized Touches",
];

const entertainment= [
  "Music",
  "Professional Entertainers",
  "Games and Activities",
  "Photo Booth",
  "Prizes and Awards",
];

const foodAndBeverages= [
  "Snacks and Appetizers",
  "Main Course",
  "Beverages",
  "Desserts",
  "Cater Everything",
];

const partySupplies= [
  "Plates and Utensils",
  "Cups and Straws",
  "Table Cloths/Table Runners",
  "Party Hats/Accessories",
  "Candles",
  "Cake Toppers",
];

const partyFavors= [
  "Return Gifts",
  "Thank You Notes",
];

const cleanUp= [
  "Trash Bags",
  "Cleaning Supplies",
  "Recycling",
  "Food Containers",
  "Vacuum",
];

const indEvent: React.FC = () => {
  const onChange: CheckboxProps["onChange"] = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <div className="text-black text-3xl font-medium break-words pt-6">Here is a curated checklist for your perfect event!</div>
      <div className="relative text-gray-600 text-xl font-medium break-words">
        Feel free to delete things you may not need.
      </div>
      <br/><br/>
      <List
        size="large"
        header={<div className="font-bold font-xl">Guests</div>}
        //   footer={<div>Footer</div>}
        bordered
        dataSource={guests}
        renderItem={item => <List.Item><Checkbox onChange={onChange}>{item}</Checkbox> <br/></List.Item>}
      />
      <br/>
      <List
        size="large"
        header={<div className="font-bold font-xl">Decorations</div>}
        bordered
        dataSource={decorations}
        renderItem={item => <List.Item><Checkbox onChange={onChange}>{item}</Checkbox> <br/></List.Item>}
      />
      <br/>
      <List
        size="large"
        header={<div className="font-bold font-xl">Entertainment</div>}
        bordered
        dataSource={entertainment}
        renderItem={item => <List.Item><Checkbox onChange={onChange}>{item}</Checkbox> <br/></List.Item>}
      />
      <br/>
      <List
        size="large"
        header={<div className="font-bold font-xl">Food and Beverages</div>}
        bordered
        dataSource={foodAndBeverages}
        renderItem={item => <List.Item><Checkbox onChange={onChange}>{item}</Checkbox> <br/></List.Item>}
      />
      <br/>
      <List
        size="large"
        header={<div className="font-bold font-xl">Party Supplies</div>}
        bordered
        dataSource={partySupplies}
        renderItem={item => <List.Item><Checkbox onChange={onChange}>{item}</Checkbox> <br/></List.Item>}
      />
      <br/>
      <List
        size="large"
        header={<div className="font-bold font-xl">Party Favors</div>}
        bordered
        dataSource={partyFavors}
        renderItem={item => <List.Item><Checkbox onChange={onChange}>{item}</Checkbox> <br/></List.Item>}
      />
      <br/>
      <List
        size="large"
        header={<div className="font-bold font-xl">Clean Up</div>}
        bordered
        dataSource={cleanUp}
        renderItem={item => <List.Item><Checkbox onChange={onChange}>{item}</Checkbox> <br/></List.Item>}
      />
      <br/>

    </>
  );
};

export default indEvent;

