import { Button, Card, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/assets/logo_dark.png";



export default function Home() {
  return (
    <div key="1" className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-#242d39] lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Bitbucket</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                {/* <HomeIcon className="h-4 w-4" /> */}
                Repositories
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                {/* <GitPullRequestIcon className="h-4 w-4" /> */}
                Pull Requests
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                {/* <BugIcon className="h-4 w-4" /> */}
                Issues
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="w-full flex-1">
            <Button className="ml-auto">Create Repository</Button>
          </div>
        </header> */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl">My Events</h1>
              <h3>Hey there, Welcome to Eventure!</h3>
            </div>

            <Button size="large" className="bg-[#314995] text-white">Create New Event</Button>
          </div>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="large"
            items={new Array(2).fill(null).map((_, i) => {
              const id = String(i + 1);

              return {
                label: `Card Tab ${id}`,
                key: id,
                children: <EventCard/>,
              };
            })}
          />
        </main>
      </div>
    </div>
  );
}


function Package2Icon(props: {className: string}) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}


function EventCard() {
  return(
    <Card
      style={{ width: 300 }}
      cover={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta
        // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
}
