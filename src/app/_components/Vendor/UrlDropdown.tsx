import { ChevronDown } from "lucide-react";

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, WebsiteIcon } from "../Icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



export function UrlDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-black text-white hover:bg-neutral-800 hover:text-white">Socials <ChevronDown/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <FacebookIcon className="mr-2 h-4 w-4" />
          <a href={"https://www.facebook.com"} target="_blank" rel="noopener noreferrer">Facebook</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <InstagramIcon className="mr-2 h-4 w-4" />
          <a href={"https://www.instagram.com"} target="_blank" rel="noopener noreferrer">Instagram</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LinkedinIcon className="mr-2 h-4 w-4" />
          <a href={"https://www.linkedin.com"} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TwitterIcon className="mr-2 h-4 w-4" />
          <a href={"https://www.twitter.com"} target="_blank" rel="noopener noreferrer">Twitter</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <WebsiteIcon className="mr-2 h-4 w-4" />
          <a href={"https://www.nishilfaldu.site"} target="_blank" rel="noopener noreferrer">Wesbite</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
