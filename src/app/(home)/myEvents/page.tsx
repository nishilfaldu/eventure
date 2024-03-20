import { Card, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
// import Image from "next/image";
import Link from "next/link";




export default function myEvents() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "white" }}>
      <div className="text-black text-5xl font-medium break-words pt-6">My Events</div>
      <div className="flex justify-between items-center">
        <div className="relative text-gray-600 text-2xl font-medium break-words">
        Hey there, welcome to Eventure!
        </div>
        <div className="relative p-3 rounded-lg bg-blue-800 text-white text-base break-words">
        Create new event
        </div>
      </div>

      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="large"
            items={new Array(2).fill(null).map((_, i) => {
              const id = String(i);

              const names: string[] =["Past Events" , "Current Events"];

              return {
                label: `${names[i]}`,
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
      <Link href="/myEvents/1">
        <Meta
          title="Card title"
          description="This is the description"
        />
      </Link>
    </Card>
  );
}
