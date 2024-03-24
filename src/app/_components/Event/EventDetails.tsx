"use client";
import { CaretRightOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Checkbox, List, Button, Modal, Input, Form, Collapse, theme } from "antd";
import { useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useMemo, useState } from "react";

import { api } from "../../../../convex/_generated/api";
import empty_cart_hippo from "@/app/images/hippo-empty-cart.png";
import { Button as ShadCNButton } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { tasks } from "@/consts/checklist";

// TODO: replace all image urls with src/domain as start instead of importing StaticImageData
// TODO: use useCallbacks and useMemo whereever possible

const guests = ["Create a guest list", "Make invitations", "Send invitations", "Track RSVP"];
const decorations = ["Balloons", "Flowers", "Banners and Posters", "Table Decoration", "Wall Decorations", "Lighting", "Personalized Touches"];
const entertainment = ["Music", "Professional Entertainers", "Games and Activities", "Photo Booth", "Prizes and Awards"];
const foodAndBeverages = ["Snacks and Appetizers", "Main Course", "Beverages", "Desserts", "Cater Everything"];
const partySupplies = ["Plates and Utensils", "Cups and Straws", "Table Cloths/Table Runners", "Party Hats/Accessories", "Candles", "Cake Toppers"];
const partyFavors = ["Return Gifts", "Thank You Notes"];
const cleanUp = ["Trash Bags", "Cleaning Supplies", "Recycling", "Food Containers", "Vacuum"];

const balloonSug = ` USA Balloonatics: It has 5 star rating on Google Maps
Balloon Therapy Cincy: It has 0 star rating on Google Maps
Cappel's: It has 4.7 star rating on Google Maps
Material Gurl Decor: It has 5 star rating on Google Maps
`;

const flowerSug = ` Dreisbach Wholesale Florists: It has 4 star rating on Google Maps. Opening hours today are 6:30 AM - 1:00 PM.
Gia and the Blooms - Findlay Market: It has 4.2 star rating on Google Maps. Opening hours today are 9:00 AM - 6:00 PM.
Abbey Florist: It has 4 star rating on Google Maps. Opening hours today are 9:00 AM - 5:00 PM.
J Robinson's Floral: It has 4.7 star rating on Google Maps. Opening hours today are 10:00 AM - 6:30 PM.
Adrian Durban Florist: It has 4.9 star rating on Google Maps. Opening hours today are 9:00 AM - 5:00 PM.`;

const bannerSug = `FASTSIGNS: It has 4.9 star rating on Google Maps. Opening hours today are 9:00 AM - 5:00 PM. Address is 120 Seventh St W, Cincinnati, OH 45202, USA.
Seemless Printing: It has 4.6 star rating on Google Maps. Opening hours today are 7:30 AM - 5:00 PM. Address is 717 Linn St, Cincinnati, OH 45203, USA.
Curative Printing: It has 5 star rating on Google Maps. Opening hours today are 8:00 AM - 5:00 PM. Address is 1025 Dalton Ave, Cincinnati, OH 45203, USA.
Glyphics Graphics Inc.: It has 5 star rating on Google Maps. Opening hours today are 9:00 AM - 5:00 PM. Address is 5158 Kieley Pl, Cincinnati, OH 45217, USA.
DBEST Printing, Inc.: It has 5 star rating on Google Maps. Opening hours today are 8:00 AM - 4:30 PM. Address is 316 W 4th St UNIT 400, Cincinnati, OH 45202, USA.`;

const proEntSug =  `Thumbtack: This website allows you to browse profiles of local entertainers, compare prices and reviews, and contact them directly to book their services. It's a great option for finding a variety of entertainers, including magicians, face painters, balloon artists, and more.
The Bash: This platform connects party planners with a variety of vendors, including kids' party entertainers. You can browse profiles, see photos and videos of their work, and request quotes directly through the platform.`;

const photoSug = `Photo Booth Cincy: They offer multiple photo booth options to fit your party's style and size. They have open concept booths, enclosed booths, and even a vintage VW Bus booth! Their attendants keep things fun and running smoothly throughout your event, and they can even provide custom props and backdrops. Photo Booth Cincy boasts a 5.0 star rating on Google Reviews.
Flash Cube Photo Booths: This company offers affordable and portable photo booth rentals for any type of event. They have a variety of packages to choose from, and they can even create a custom backdrop to match your party theme. Flash Cube Photo Booths has a 5.0 star rating on Google Reviews.
Signature Photo Booth: They offer a variety of photo booth rental options for weddings, corporate events, and parties. They have open concept and enclosed booths, and they can provide a variety of props and backdrops to choose from. Signature Photo Booth has a perfect 5.0 star rating on Google Reviews.`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = panelStyle => [
  {
    key: "1",
    label: "Balloon Decor",
    children: <div>
      {balloonSug.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>,
    style: panelStyle,
  },
  {
    key: "2",
    label: "Flowers",
    children: <div>
      {flowerSug.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "Banners and Posters",
    children: <div>
      {bannerSug.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>,
    style: panelStyle,
  },
  {
    key: "4",
    label: "Professional Entertainers",
    children: <div>
      {proEntSug.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>,
    style: panelStyle,
  },
  {
    key: "5",
    label: "Photo Booth",
    children: <div>
      {photoSug.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>,
    style: panelStyle,
  },
];

interface EventDetailsProps {
  eventId: string;
}

export function EventDetails({ eventId } : EventDetailsProps) {
  const generateChecklist = useMutation(api.tasks.createTasksByEventId);

  const rearrangedTasks = useMemo(() => {
    const _tasks = tasks.map(task => {
      return task.data.map(item => {
        return {
          eventId: eventId,
          header: task.title,
          description: item,
          done: false,
        };
      }
      );
    });

    return _tasks.flat();
  }, [eventId]);

  console.log(rearrangedTasks);

  const handleGenerateChecklist = useCallback(() => {
    try {
      generateChecklist({
        tasksArray: rearrangedTasks,
      });

      toast({
        title: "Checklist Generated",
        description: "Checklist has been generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while generating the checklist",
      });
    }
  }, [generateChecklist, rearrangedTasks]);


  const [lists, setLists] = useState([
    { title: "Guests", data: guests },
    { title: "Decorations", data: decorations },
    { title: "Entertainment", data: entertainment },
    { title: "Food and Beverages", data: foodAndBeverages },
    { title: "Party Supplies", data: partySupplies },
    { title: "Party Favors", data: partyFavors },
    { title: "Clean Up", data: cleanUp },
  ]);

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddItem = () => {
    form.validateFields().then(values => {
      // Add the new item to the appropriate category
      const updatedLists = [...lists];
      const categoryIndex = updatedLists.findIndex(list => list.title === values.category);
      if (categoryIndex !== -1) {
        updatedLists[categoryIndex].data.push(values.item);
        setLists(updatedLists);
      }
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleDeleteItem = (listIndex: number, itemIndex: number) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].data.splice(itemIndex, 1);
    setLists(updatedLists);
  };

  return (
    <>
      {
        true ? (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div aria-hidden="true" className="relative mb-4 h-60 w-60">
              <Image
                src={empty_cart_hippo}
                fill
                alt="empty shopping cart placeholder image"
              />
            </div>
            <div className="text-xl font-semibold">
                Your task list is empty
            </div>
            <ShadCNButton variant={"link"} onClick={handleGenerateChecklist}>
                Generate Checklist
            </ShadCNButton>
          </div>
        ) : (
          <>
            <div className="text-black text-3xl font-medium break-words pt-6">Here is a curated checklist for your perfect event!</div>
            <div className="flex justify-between items-center">
              <div className="relative text-gray-600 text-xl font-medium break-words">
        Check things off as you take care of them. Feel free to delete things you may not need.
              </div>
              <div className="relative p-2 rounded-lg bg-blue-800 text-white text-base break-words">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showModal}
                >
          Add New Item
                </Button>
              </div>
            </div>
            <br/><br/>
            <Modal
              title="Add New Item"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button key="cancel" onClick={handleCancel}>
            Cancel
                </Button>,
                <Button className="bg-blue-800" key="submit" type="primary" onClick={handleAddItem}>
            Add
                </Button>,
              ]}
            >
              <Form form={form} layout="vertical">
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true, message: "Please select a category" }]}
                >
                  <Input placeholder="Enter category" />
                </Form.Item>
                <Form.Item
                  name="item"
                  label="Item"
                  rules={[{ required: true, message: "Please enter an item" }]}
                >
                  <Input placeholder="Enter item" />
                </Form.Item>
              </Form>
            </Modal>
            {lists.map((list, listIndex) => (
              <div key={listIndex}>
                <div className="font-bold text-xl">{list.title}</div>
                <List
                  size="large"
                  bordered
                  dataSource={list.data}
                  renderItem={(item, itemIndex) => (
                    <List.Item>
                      {list.title === "Guests" && item === "Create a guest list" ? (
                        <>
                          <Checkbox><a className="underline" href="/guest-list" rel="noopener noreferrer">{item}</a></Checkbox>
                          <DeleteOutlined onClick={() => handleDeleteItem(listIndex, itemIndex)} />
                        </>
                      ) : list.title === "Guests" && item === "Track RSVP" ? (
                        <>
                          <Checkbox><a className="underline" href="/track-rsvp" rel="noopener noreferrer">{item}</a></Checkbox>
                          <DeleteOutlined onClick={() => handleDeleteItem(listIndex, itemIndex)} />
                        </>
                      ) : (
                        <>
                          <Checkbox>{item}</Checkbox>
                          <DeleteOutlined onClick={() => handleDeleteItem(listIndex, itemIndex)} />
                        </>
                      )}
                    </List.Item>
                  )}
                />
                <br/>
              </div>
            ))}
          </>
        )
      }






      {/* advice, find experts, vendor suggestions */}
      <div className="text-black text-3xl font-medium break-words pt-6">Need expert advice for your event?</div>
      <div className="flex justify-between items-center">
        <div className="relative text-gray-600 text-xl font-medium break-words">
        Eventure connects you to experts in the field of event management at a minimal cost.
        Chat with our experts now!
        </div>
        <ShadCNButton variant="default" className="text-base" size={"default"}>
          <Link href={"/"}>
            Find an expert
          </Link>
        </ShadCNButton>
      </div>

      <div className="text-black text-3xl font-medium break-words pt-6">Looking for vendors?</div>
      <div className="relative text-gray-600 text-xl font-medium break-words">
        Eventure has gathered vendor suggestions for your event. Could we make things ANY more easy for you?
      </div>
      <br></br>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </>
  );
};

