import { SignInOrComposer } from "./_components/SignInOrShowApp";
import { VendorGrid } from "./_components/Vendor/VendorGrid";



export default function Home() {
  return (
    <SignInOrComposer>
      <VendorGrid/>
    </SignInOrComposer>
  );
}
