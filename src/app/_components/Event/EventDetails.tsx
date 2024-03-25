"use client";
import { CaretRightOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Checkbox, List, Button, Modal, Input, Form, Collapse, theme } from "antd";
import { useMutation, useQuery } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useMemo, useState } from "react";

import { api } from "../../../../convex/_generated/api";
import empty_cart_hippo from "@/app/images/hippo-empty-cart.png";
import { Button as ShadCNButton } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { tasks } from "@/consts/checklist";
import { balloonSug, bannerSug, flowerSug, photoSug, proEntSug } from "@/consts/vendors";
import type { Id } from "convex/_generated/dataModel";

// TODO: replace all image urls with src/domain as start instead of importing StaticImageData
// TODO: use useCallbacks and useMemo whereever possible



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
  const addTask = useMutation(api.tasks.createTaskByEventId);
  const groupedTasks = useQuery(api.tasks.getTasksByEventId, { eventId });
  const deleteTask = useMutation(api.tasks.deleteTaskById);
  console.log(groupedTasks);
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

  //   console.log(rearrangedTasks);

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

  const handleAddItem = useCallback(() => {
    form.validateFields().then(async values => {
      console.log(values, "values");
      if (!values.category.trim() || !values.item.trim()) {
        toast({
          title: "Missing Fields",
          description: "Please fill all the fields to submit the form",
        });

        return;
      }
      try {
        await addTask({
          eventId: eventId,
          header: values.category.trim(),
          description: values.item.trim(),
        });

        toast({
          title: "Add Item",
          description: "Added new item to the checklist successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error while adding the item to the checklist",
        });
      }
      form.resetFields();
      setIsModalVisible(false);
    });
  }, [addTask, eventId, form]);

  const handleDeleteItem = useCallback(async (id: Id<"tasks">) => {
    try {
      await deleteTask({ taskId: id });
      toast({
        title: "Delete Item",
        description: "Deleted item from the checklist successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while deleting the item from the checklist",
      });
    }
  }, [deleteTask]);

  return (
    <>
      {
        groupedTasks && groupedTasks.length === 0 ? (
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
              <ShadCNButton onClick={showModal} className="flex gap-x-2">
                <Plus/> Add New Item
              </ShadCNButton>
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
            {groupedTasks?.map((taskCategory, idx) => (
              <div key={taskCategory.header+"$_{idx}"}>
                <div className="font-bold text-xl">{taskCategory.header}</div>
                <List
                  size="large"
                  bordered
                  dataSource={taskCategory.tasks}
                  renderItem={(item: any, itemIndex) => (
                    <List.Item>
                      <>
                        <Checkbox>{item.description}</Checkbox>
                        <DeleteOutlined onClick={() => handleDeleteItem(item._id)} />
                      </>
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

