"use client";

import { useUser } from "@clerk/nextjs";

import DesktopItem from "./DesktopItem";
import useRoutes from "@/app/_hooks/useRoutes";




interface DesktopSidebarProps {
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = () => {
  const routes = useRoutes();
  const { user } = useUser();
  console.log({ user }, "TEST");


  return (
    <>
      {/* <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <div className="
        hidden
        lg:z-40
        lg:w-20
        lg:overflow-y-auto
        lg:bg-red-900
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        h-full
      ">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map(item => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
        {/* <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
            <Avatar className="h-8 w-8">
              <AvatarImage alt="User Avatar" src={user?.imageUrl}/>
              {
                user && user.firstName && user.lastName ?
                  <AvatarFallback>{user?.firstName[0]} {user?.lastName[0]}</AvatarFallback>
                  :  <AvatarFallback>UNK</AvatarFallback>
              }
            </Avatar>
          </div>
        </nav> */}
      </div>
    </>
  );
};

export default DesktopSidebar;
