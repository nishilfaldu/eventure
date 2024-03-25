import { SocketContextProvider } from "../_components/VideoCall/SocketContext";



export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketContextProvider>
      <div>
        {/* <Sidebar>
        <div className="">
          <UserList />
          {children}
        </div>
      </Sidebar> */}
        {children}
      </div>
    </SocketContextProvider>

  );
}
