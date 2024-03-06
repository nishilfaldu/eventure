import Image from "next/image";

import logo from "../../public/assets/logo_dark.png";



const links = ["My Events", "Profile"];
export default function dashboard() {
  return (
    <nav className="bg-[#242D39] flex justify-between items-center h-20 p-4" >
      <Image className="justify-center" style ={{ width: 280, height: 110 }} src={logo} alt="Logo" />
      <ul className="flex justify-start gap-6 list-none text-white text-xl">
        {links.map(link=><li key={link}><a href="#">{link}</a></li>)}
      </ul>
    </nav>
  );
}
