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
//   const { user, isLoaded, isSignedIn } = useUser();
//   const currUserEmailAddress = user?.primaryEmailAddress?.toString();
//   console.log({ currUserEmailAddress }, "TEST");
//   const users = useQuery(api.users.getUsers, { email: currUserEmailAddress! });

  //   if (!isSignedIn || !isLoaded) { return <h1>Loading...</h1>; }


  return (
    // <aside
    //   className="
    //     lg:pb-0
    //     lg:left-20
    //     lg:w-80
    //     lg:block
    //     overflow-y-auto
    //     border-r
    //     border-gray-200
    //     block
    //   "
    // >
    //   <div className="px-5">
    //     <div className="flex-col">
    //       <div
    //         className="
    //           text-2xl
    //           font-bold
    //           text-neutral-800
    //           py-4
    //         "
    //       >
    //         People
    //       </div>
    //     </div>
    //     {users?.map(user => (
    //       <UserBox
    //         key={user._id}
    //         data={user}
    //       />
    //     ))}
    //   </div>
    // </aside>
    <ScrollArea className="h-screen py-4">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {users?.map((user:any) => (
          <button
            key={user._id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            //   mail.selected === item.id && "bg-muted"
            )}
            // onClick={() =>
            //   setMail({
            //     ...mail,
            //     selected: item.id,
            //   })
            // }
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
