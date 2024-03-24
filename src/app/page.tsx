import { preloadQuery } from "convex/nextjs";

import { SignInOrComposer } from "./_components/SignInOrShowApp";
import { VendorGrid } from "./_components/Vendor/VendorGrid";
import { api } from "../../convex/_generated/api";



export default async function Home() {
  const preloadedProfessionals = await preloadQuery(api.users.getProfessionals, {});

  return (
    <>
      <SignInOrComposer>
        <VendorGrid preloadedProfessionals={preloadedProfessionals}/>
      </SignInOrComposer>
    </>
  );
}
