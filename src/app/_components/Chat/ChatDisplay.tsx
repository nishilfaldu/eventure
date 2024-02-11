import {
  MoreVertical,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";






interface ChatDisplayProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
}

export function ChatDisplay({ user }: ChatDisplayProps) {
  return (
    <div className="flex h-full flex-col">

      <Separator />
      {user ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={user.pictureUrl} />
                <AvatarFallback>
                  {user.firstName[0]} {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{user.firstName} {user.lastName}</div>
                <div className="line-clamp-1 text-xs">{"online"}</div>
              </div>
            </div>

            <div className="flex items-center ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!user}>
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                  <DropdownMenuItem>Star thread</DropdownMenuItem>
                  <DropdownMenuItem>Add label</DropdownMenuItem>
                  <DropdownMenuItem>Mute thread</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {/* {mail.text} */}
            here goes messages
          </div>
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
                    // onClick={e => e.preventDefault()}
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
