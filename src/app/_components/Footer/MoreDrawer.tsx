import { ChevronDown } from "lucide-react";
import * as React from "react";

import { NavCol } from "./NavCol";
import { LogoSquare } from "../Navbar/Logo";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";




export function MoreDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <span className="ml-3 text-gray-500 p-0 flex hover:cursor-pointer hover:text-black">More <ChevronDown/></span>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full">
          <footer className="text-gray-600 body-font">
            <div className="container flex md:items-start md:flex-row flex-col justify-center items-center">
              <div className="w-64 text-left">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                  <LogoSquare/>
                </a>
                <p className="mt-2 text-sm text-gray-500 text-center md:text-start">Eventure is an event management application</p>
              </div>
              <NavCol
                heading="Main"
                links={[
                  {
                    external: true,
                    label: "Download App",
                    url: "/",
                  },
                  {
                    external: true,
                    label: "Help Center",
                    url: "/",
                  },
                  {
                    external: false,
                    label: "Contact Us",
                    url: "/",
                  },
                  {
                    external: false,
                    label: "Payment Support",
                    url: "/",
                  },
                ]} />
              <NavCol
                heading="Information"
                links={[
                  {
                    external: false,
                    label: "About Us",
                    url: "/about",
                  },
                  {
                    external: false,
                    label: "Privacy Policy",
                    url: "/privacy",
                  },
                  {
                    external: false,
                    label: "FAQ",
                    url: "/faq",
                  },
                  {
                    external: false,
                    label: "Terms and Conditions",
                    url: "/terms",
                  },
                ]}
              />
            </div>
          </footer>
          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
