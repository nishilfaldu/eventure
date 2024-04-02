"use client";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import Image from "next/image";

import Options from "./Dropdown";
import bg  from "../../images/bg.jpg";
import logo  from "../../images/logo2.png";




export default function Landing() {
  return (
    <div className="grid h-screen grid-cols-2 max-h-full">
      <div className=" bg-gray-500 flex items-center justify-center overflow-hidden max-h-full">
        <Image src={bg} alt="Background" className="w-full h-full object-cover"/>
      </div>
      <div className="bg-white">
        <div className="flex flex-col justify-center items-center p-10">
          <Image src={logo} alt="Logo" className=" mt-20" />
        </div>
        <div className="relative flex flex-col justify-center items-center">
          <Options />
          <SignUpButton mode="modal" afterSignUpUrl="/">
            <div className="cursor-pointer relative mt-20 p-4 bg-blue-800 rounded-lg justify-center items-center text-white">Cue the Celebration</div>
          </SignUpButton>

          <div className="relative p-5 flex flex-col justify-center items-center text-black text-base font-league-spartan font-normal underline break-words">
            <SignInButton mode="modal" afterSignInUrl="/">Sign in</SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
