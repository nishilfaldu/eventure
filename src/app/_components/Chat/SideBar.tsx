import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";



export function Sidebar({ children }: {
  children: React.ReactNode;
}) {
//   const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
}

