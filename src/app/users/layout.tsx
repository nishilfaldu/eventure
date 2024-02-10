import { Sidebar } from "../_components/Chat/SideBar";
import UserList from "../_components/Chat/UserList";



export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-16">
      <Sidebar>
        <div className="h-full">
          <UserList />
          {children}
        </div>
      </Sidebar>
    </div>

  );
}
