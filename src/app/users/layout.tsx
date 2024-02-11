


export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Sidebar>
        <div className="">
          <UserList />
          {children}
        </div>
      </Sidebar> */}
      {children}
    </div>

  );
}
