"use client";

import useStoreUserEffect from "@/lib/useStoreUserEffect";



export function Composer() {
  const userId = useStoreUserEffect();
  console.log(userId);
  if(!userId) { return null; }

  return;
}
