import { Button, Card, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
// import Image from "next/image";
// import Link from "next/link";

import SideNav from "../_components/SideNav";



export default function Home() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "white" }}>
      <SideNav/>
      <div style={{ width: 216, height: 47, left: 355, top: 68, position: "absolute" }}>
        <div style={{ color: "black", fontSize: 45, fontWeight: "500", wordWrap: "break-word" }}>My Events<br/></div>
        <div style={{ color: "#958F8F", fontSize: 30, fontWeight: "500", wordWrap: "break-word" }}><br/></div>
      </div>

      <div style={{ width: 195, height: 50, left: 1174, top: 73, position: "absolute", background: "#314995", borderRadius: 10 }} />
      <div style={{ width: 161, height: 15, left: 1205, top: 90, position: "absolute", color: "white", fontSize: 18, fontWeight: "500", wordWrap: "break-word" }}>Create new event</div>

      <div style={{ width: 756, height: 41, left: 354, top: 124, position: "absolute", color: "#958F8F", fontSize: 30, fontWeight: "500", wordWrap: "break-word" }}>Hey there, welcome to Eventure!</div>
      <div style={{ width: 1047, height: "75vh", left: 357, top: 185, position: "absolute", background: "white", boxShadow: "0px 4px 4px black" }} >
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Tabs
              defaultActiveKey="1"
              type="card"
              size="large"
              items={new Array(2).fill(null).map((_, i) => {
                const id = String(i + 1);

                return {
                  label: `Current Events ${id}`,
                  key: id,
                  children: <EventCard/>,
                };
              })}
            />
          </main>
        </div>
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
      <Meta
        // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
}
