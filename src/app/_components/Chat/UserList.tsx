/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";



interface UserListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any | [];
}

export function UserList({ users }: UserListProps) {
  return (
    <ScrollArea className="h-screen py-4">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {users?.map((user:any) => (
          <button
            key={user._id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            //   mail.selected === item.id && "bg-muted"
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt="User Avatar" src={user?.pictureUrl}/>
                    {
                      user && user.firstName && user.lastName ?
                        <AvatarFallback>{user?.firstName[0]} {user?.lastName[0]}</AvatarFallback>
                        :  <AvatarFallback>UNK</AvatarFallback>
                    }
                  </Avatar>
                  {user.firstName} {user.lastName}
                  {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                </div>
              </div>
              {/* <div className="text-xs font-medium">{item.subject}</div> */}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default UserList;
