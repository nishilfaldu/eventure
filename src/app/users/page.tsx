import { ChatWindow } from "../_components/Chat/Window";




export default function PeoplePage() {
//   const layout = cookies().get("react-resizable-panels:layout");
//   const collapsed = cookies().get("react-resizable-panels:collapsed");

  //   const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  //   const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    // <div className="hidden lg:block lg:pl-80">
    //   <EmptyState />
    // </div>
    <div className="overflow-hidden rounded-lg border bg-background shadow-lg w-full relative">
      <ChatWindow
        defaultLayout={undefined}
        defaultCollapsed={undefined}
        navCollapsedSize={4}
      />
    </div>
  );
};
