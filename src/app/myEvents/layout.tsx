import SideNav from "../_components/SideNav";



export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideNav/>
      <div>
        {children}
      </div>
    </>
  );
}
