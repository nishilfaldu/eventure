import { VendorGrid } from "./_components/Vendor/VendorGrid";
import Image from "next/image";
import Link from "next/link";

import Options from "./_components/Dropdown";
import bg from "../public/assets/bg.jpg";
import logo from "../public/assets/logo2.png";




export default function Home() {
  return (
    <div>
      {/* <UserProfile /> */}
      <div className="flex items-center justify-center text-6xl font-bold my-16">
        <h1 className="text-center">Browse Event Professionals</h1>
      </div>
      <div>
        <VendorGrid/>
      </div>
    </div>
    <div>
      <div style={{ width: "100%", height: "100%", position: "relative", background: "white" }}>
        <Image style={{ width: 485, height: 202, left: 824, top: 180, position: "absolute" }} src={logo} alt="Logo"/>
        <div style={{ width: 541, height: 166, left: 802, top: 384, position: "absolute" }}>
          <div style={{ width: 541, height: 166, left: 0, top: 0, position: "absolute", background: "#242D39", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 10 }} />
          <Link href="/sign-up">
            <div style={{ width: 492, height: 53, left: 25, top: 83, position: "absolute", background: "#314995", borderRadius: 10 }} />
            <div style={{ width: 221, height: 43, left: 196, top: 102, position: "absolute", color: "white", fontSize: 20, fontWeight: "400", wordWrap: "break-word" }}>Cue the Celebration   </div>
          </Link>
          <div style={{ width: 198, height: 17, left: 30, top: 14, position: "absolute", color: "white", fontSize: 13, fontFamily:"Quicksand", fontWeight: "400", wordWrap: "break-word" }}>I’M PLANNING A...</div>
          <div>
            <Options />
          </div>

        </div>
        <Link href="/sign-in">
          <div style={{ width: 157, height: 24, left: 1019, top: 573, position: "absolute", color: "black", fontSize: 15, fontFamily: "League Spartan", fontWeight: "400", textDecoration: "underline", wordWrap: "break-word" }}>Click here to sign in</div>
        </Link>
        <Image style={{ width: 675, height: 815, left: 0, top: -0.55, position: "absolute" }} src={bg} alt="Background" />
      </div>
    </div>
  );
}




