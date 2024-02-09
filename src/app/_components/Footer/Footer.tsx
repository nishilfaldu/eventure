import dayjs from "dayjs";

import { MoreDrawer } from "./MoreDrawer";



export function Footer() {
  return(
    <div className="bg-gray-100 body-font shadow-sm border-t border-gray-200">
      <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">© {dayjs().year()} Eventure —
          <a href="https://instagram.com/eventure" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@eventure</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500">
            Terms
          </a>
          <a className="ml-3 text-gray-500">
            Privacy
          </a>
          <span className="flex">
            <MoreDrawer/>
          </span>
          {/* <a className="ml-3 text-gray-500">

          </a> */}
        </span>
      </div>
    </div>
  );
}
