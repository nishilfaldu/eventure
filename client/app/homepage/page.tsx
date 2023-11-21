// import { Quicksand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/logo.svg";




function Landing() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        // opacity: 0.85,
        // background: "white",
      }}
    >
      <Image
        style={{
          width: 1440,
          height: 832,
          //   left: -30,
          //   top: -16,
          position: "relative",
        }}
        src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Loading..."
        width={1440}
        height={832}
      />
      <Image
        style={{
          width: 454,
          height: 202,
          left: 505,
          top: 87,
          position: "absolute",
        }}
        src={logo}
        alt="Loading..."
      />
      <div
        style={{
          width: 541,
          height: 166,
          left: 445,
          top: 320,
          position: "absolute",
        }}
      >
        <div
          style={{
            width: 541,
            height: 166,
            left: 0,
            top: 0,
            position: "absolute",
            background: "#242D39",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        />
        <Link href="/signup">
          <div
            style={{
              width: 492,
              height: 53,
              left: 25,
              top: 83,
              position: "absolute",
              background: "#314995",
              borderRadius: 10,
            }}
          />{" "}
        </Link>
        <Link href="/signup">
          <div
            style={{
              width: 221,
              height: 43,
              left: 201,
              top: 99,
              position: "absolute",
              color: "white",
              fontSize: 20,
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Cue the Celebration{" "}
          </div>
        </Link>
        <div
          style={{
            width: 198,
            height: 17,
            left: 30,
            top: 14,
            position: "absolute",
            color: "white",
            fontSize: 13,
            fontFamily: "Quicksand",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          I’M PLANNING A...
        </div>
        <div
          style={{
            width: 492,
            height: 36,
            left: 25,
            top: 37,
            position: "absolute",
            background: "white",
          }}
        />
      </div>
      <Link href="/login">
        <div
          style={{
            width: 157,
            height: 24,
            left: 675,
            top: 498,
            position: "absolute",
            color: "black",
            fontSize: 15,
            fontWeight: "400",
            textDecoration: "underline",
            wordWrap: "break-word",
          }}
        >
          Click here to sign in
        </div>
      </Link>
    </div>
  );
}

export default Landing;
