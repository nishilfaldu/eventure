"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { MessageSquareText, UsersRound } from "lucide-react";
import { useState } from "react";

import { ChatDisplay } from "./ChatDisplay";
import { Nav } from "./Nav";
import UserList from "./UserList";
import { api } from "../../../../convex/_generated/api";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
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
          className="h-full max-h-[800px] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={(collapsed : boolean) => {
              setIsCollapsed(collapsed);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                collapsed
              )}`;
            }}
            className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
          >

            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "People",
                  label: "128",
                  icon: UsersRound,
                  variant: "ghost",
                  href: "/users",
                },
                {
                  title: "Conversations",
                  label: "9",
                  icon: MessageSquareText,
                  variant: "ghost",
                  href: "/conversations",
                },
              ]}
            />
          </ResizablePanel>

          <ResizableHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <UserList
              // items={mails}
              users={users ?? []}
            />

          </ResizablePanel>

          <ResizableHandle/>

          <ResizablePanel defaultSize={defaultLayout[2]}>
            <ChatDisplay
            // mail={mails.find((item) => item.id === mail.selected) || null}
              user={users ? users[0] : null}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
}
