import { ChevronDown } from "lucide-react";

import { InstagramIcon, LinkedinIcon, TwitterIcon, WebsiteIcon } from "../Icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";



interface UrlDropdownProps {
  linkedInHref?: string;
  instagramHref?: string;
  twitterHref?: string;
  websiteHref?: string;
}

export function UrlDropdown(
  { linkedInHref, instagramHref, twitterHref, websiteHref }
  : UrlDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-4 w-4"><ChevronDown/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Separator orientation="vertical"/>
        <DropdownMenuItem>
          <InstagramIcon className="mr-2 h-4 w-4" />
          <a href={instagramHref} target="_blank" rel="noopener noreferrer">Instagram</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LinkedinIcon className="mr-2 h-4 w-4" />
          <a href={linkedInHref} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TwitterIcon className="mr-2 h-4 w-4" />
          <a href={twitterHref} target="_blank" rel="noopener noreferrer">Twitter</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <WebsiteIcon className="mr-2 h-4 w-4" />
          <a href={websiteHref} target="_blank" rel="noopener noreferrer">Wesbite</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
