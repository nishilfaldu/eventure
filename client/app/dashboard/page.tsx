import { UserButton } from "@clerk/nextjs";



export default function Page() {
  return (
    <h1>
        Welcome to Dashboard
      <UserButton/>
    </h1>
  );
}
