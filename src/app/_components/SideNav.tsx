"use client";
import Image from "next/image";

import logo from "../../public/assets/logo_dark.png";



export default function SideNav() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ width: 320, height: 832, left: 0, top: 0, position: "absolute", background: "#242D39" }} />
      <div style={{ width: 320, height: 74, left: 0, top: 757, position: "absolute", background: "#D9D9D9" }} />
      <div style={{ width: 40, height: 40, left: 40, top: 774, position: "absolute", background: "#242D39", borderRadius: 9999 }} />
      <div style={{ width: 164, height: 41, left: 97, top: 786, position: "absolute", color: "black", fontSize: 20, fontFamily: "League Spartan", fontWeight: "500", wordWrap: "break-word" }}>Log Out </div>
      <Image style={{ width: 300, height: 130, left: 9, top: 37, position: "absolute" }} src={logo} alt="Logo" />
      <div style={{ width: 30, height: 30, left: 51, top: 203, position: "absolute", background: "#D9D9D9", borderRadius: 9999 }} />
      <div style={{ width: 30, height: 30, left: 51, top: 273, position: "absolute", background: "#D9D9D9", borderRadius: 9999 }} />
      <div style={{ width: 164, height: 41, left: 106, top: 209, position: "absolute", color: "white", fontSize: 20, fontFamily: "League Spartan", fontWeight: "500", wordWrap: "break-word" }}>My Events</div>
      <div style={{ width: 164, height: 41, left: 106, top: 282, position: "absolute", color: "white", fontSize: 20, fontFamily: "League Spartan", fontWeight: "500", wordWrap: "break-word" }}>Profile</div>
    </div>
  );
}
