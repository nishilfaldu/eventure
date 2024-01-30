import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/assets/logo2.png";



export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <div className="flex items-center ">
        <Link href="/">
          <Image style={{ width: 485, height: 202 }} src={logo} alt="Logo"/>
        </Link>
      </div>
      <SignUp/>
    </div>
  );
}
