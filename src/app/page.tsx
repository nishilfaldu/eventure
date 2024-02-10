import { VendorGrid } from "./_components/Vendor/VendorGrid";





export default function Home() {
  return (
    <div>
      {/* <UserProfile /> */}
      <div className="flex items-center justify-center text-6xl font-bold my-16">
        <h1 className="text-center">Browse Event Professionals</h1>
      </div>
      <div>
        <VendorGrid/>
      </div>
    </div>
  );
}
