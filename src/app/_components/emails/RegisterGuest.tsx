"use client";

import { useAction } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import type { Id } from "convex/_generated/dataModel";



interface RegisterGuestProps {
  id: string;
}
export function RegisterGuest({ id } : RegisterGuestProps) {
  const register = useAction(api.guests.register);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function registerGuest() {
      const guest = await register({
        guestId: id as Id<"guests">,
      });
      if(guest) {
        setRegistered(guest.registered);
      }
    }

    registerGuest();
  }, [register, id]);

  return(
    <div className="flex h-full flex-col items-center justify-center space-y-1">
      <div aria-hidden="true" className="relative mb-4 h-60 w-60">
        <Image
          src={"/images/hippo-empty-cart.png"}
          fill
          alt="empty shopping cart placeholder image"
        />
      </div>
      <div className="text-xl font-semibold">
        {registered ? "You have successfully registered for the event" : "There was an error while registering for the event"}
      </div>
      <Button variant={"link"} >
        <Link href="/">Explore Eventure</Link>
      </Button>
    </div>
  );
}
