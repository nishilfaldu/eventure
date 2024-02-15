import {
  MoreHorizontalIcon,
  MoreVertical, PhoneIcon, VideoIcon,
} from "lucide-react";

import { MessageBox } from "./MessageBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";






interface ChatDisplayProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
}

export function ChatDisplay({ user }: ChatDisplayProps) {
  return (
    <div className="flex flex-col">

      <Separator />
      {user ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-2">

            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={user.pictureUrl} />
                <AvatarFallback>
                  {user.firstName[0]} {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex justify-center items-center">
                <div className="font-semibold text-lg">{user.firstName} {user.lastName}</div>
              </div>
            </div>

            <div className="flex items-center ml-auto gap-x-4">
              <Button className="rounded-full w-8 h-8" size="icon" variant="ghost">
                <VideoIcon className="h-4 w-4" />
                <span className="sr-only">Start video call</span>
              </Button>
              <Button className="rounded-full w-8 h-8" size="icon" variant="ghost">
                <PhoneIcon className="h-4 w-4" />
                <span className="sr-only">Start voice call</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />
          <ScrollArea className="h-72">
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
              <div className="flex flex-col gap-4">
                {/* <div className="flex items-start">
                  <img
                    alt="Avatar"
                    className="rounded-full aspect-square object-cover border mt-2 ml-2"
                    height="32"
                    src="/placeholder.svg"
                    width="32"
                  />
                  <div className="ml-4 p-2 rounded-lg bg-gray-100/40 dark:bg-gray-800/40">
                    <div className="font-semibold">Jane Doe</div>
                Hi there! How can I help you today?
                  </div>
                </div> */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <MessageBox
                    key={index}
                    firstName="John"
                    lastName="Doe"
                    pictureUrl=""
                    messageText="Hi there! How can I help you today?"
                  />
                ))}
                {/* <MessageBox firstName="John" lastName="Doe" pictureUrl="" messageText="Hi there! How can I help you today?" /> */}

                {/* <div className="flex items-start">
                  <img
                    alt="Avatar"
                    className="rounded-full aspect-square object-cover border mt-2 ml-2"
                    height="32"
                    src="/placeholder.svg"
                    width="32"
                  />
                  <div className="ml-4 p-2 rounded-lg bg-gray-100/40 dark:bg-gray-800/40">
                    <div className="font-semibold">Jane Doe</div>
                Hi there! How can I help you today?
                  </div>
                </div> */}
              </div>
            </div>
          </ScrollArea>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${user.name}...`}
                />
                <div className="flex items-center">
                  <Button
                    onClick={e => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
