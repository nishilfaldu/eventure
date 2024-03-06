"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { MessageSquareIcon, MessageSquareText, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AvatarGeneral } from "./AvatarGeneral";
import { ChatDisplay } from "./ChatDisplay";
import { Nav } from "./Nav";
import UserList from "./UserList";
import { api } from "../../../../convex/_generated/api";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";



interface WindowProps {
  // accounts: {
  //   label: string
  //   email: string
  //   icon: React.ReactNode
  // }[]
  // mails: Mail[]
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatWindow(
  {
    defaultLayout = [265, 440, 655], defaultCollapsed = false,
    navCollapsedSize,
  }: WindowProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const { user } = useUser();
  const currUserEmailAddress = user?.primaryEmailAddress?.toString();
  console.log({ currUserEmailAddress }, "TEST");
  const users = useQuery(api.users.getUsers, { email: currUserEmailAddress! });

  return(
    <>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={collapsed => {
              setIsCollapsed(collapsed);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                collapsed
              )}`;
            }}
            className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
          >
            <div className={cn("flex h-[57px] items-center justify-center", isCollapsed ? "h-[52px]": "px-2")}>
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <MessageSquareIcon className="h-6 w-6" />
                <span className="">Chats</span>
              </Link>
            </div>
            <Separator />

            <Nav
              isCollapsed={isCollapsed}
              links={
                users ? users.map(user => (
                  {
                    title: user.firstName + " " + user.lastName,
                    label: "4",
                    // eslint-disable-next-line max-len
                    icon: <AvatarGeneral key={user._id} firstName={user.firstName} lastName={user.lastName} pictureUrl={user.pictureUrl} />,
                    variant: "ghost",
                    href: "/users",
                  }))
                  : []
              }
            />
          </ResizablePanel>

          <ResizableHandle withHandle/>
          {/* <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <UserList
              // items={mails}
              users={users ?? []}
            />

          </ResizablePanel>

          <ResizableHandle/> */}

          <ResizablePanel defaultSize={defaultLayout[2]}>
            <ChatDisplay
            // mail={mails.find((item) => item.id === mail.selected) || null}
              user={users ? users[0] : null}
            />
          </ResizablePanel>

          <ResizableHandle withHandle/>
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
}
