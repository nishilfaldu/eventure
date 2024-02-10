"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery  } from "convex/react";

import UserBox from "./UserBox";
import { api } from "../../../../convex/_generated/api";



export function UserList() {
  const { user, isLoaded, isSignedIn } = useUser();
  const currUserEmailAddress = user?.primaryEmailAddress?.toString();
  console.log({ currUserEmailAddress }, "TEST");
  const users = useQuery(api.users.getUsers, { email: currUserEmailAddress! });

  if (!isSignedIn || !isLoaded) { return <h1>Loading...</h1>; }


  return (
    <aside
      className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
              text-2xl
              font-bold
              text-neutral-800
              py-4
            "
          >
            People
          </div>
        </div>
        {users?.map(user => (
          <UserBox
            key={user._id}
            data={user}
          />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
