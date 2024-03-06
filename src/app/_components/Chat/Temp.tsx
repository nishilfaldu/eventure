import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";



export default function Component() {
  return (
    <>
      <div key="1" className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-white lg:block dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <MessageSquareIcon className="h-6 w-6" />
                <span className="">Chats</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <div className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  href="#"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full aspect-square object-cover border"
                    height="40"
                    src="/placeholder.svg"
                    width="40"
                  />
                Jane Doe
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">4</Badge>
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full aspect-square object-cover border"
                    height="40"
                    src="/placeholder.svg"
                    width="40"
                  />
                John Smith
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full aspect-square object-cover border"
                    height="40"
                    src="/placeholder.svg"
                    width="40"
                  />
                Alice Johnson
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full aspect-square object-cover border"
                    height="40"
                    src="/placeholder.svg"
                    width="40"
                  />
                Bob Brown
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t lg:border-t-0 lg:border-l">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-white px-6 dark:bg-gray-800/40">
            <Link className="lg:hidden flex items-center gap-2 text-2xl font-semibold" href="#">
              <MessageSquareIcon className="h-6 w-6" />
              <span className="sr-only">Chats</span>
            </Link>
            <div className="w-full flex-1">
              <h1 className="font-semibold text-lg md:text-2xl">Jane Doe</h1>
            </div>
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
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex flex-col gap-4 min-h-[200px]">
              <div className="flex items-start">
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
              </div>

              <div className="flex items-start">
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
              </div>
            </div>
            <div className="mt-auto">
              <form className="flex gap-2">
                <Input className="flex-1" placeholder="Type a message..." type="text" />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function MessageSquareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}


function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
