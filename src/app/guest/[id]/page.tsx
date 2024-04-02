import { RegisterGuest } from "@/app/_components/Emails/RegisterGuest";



export default function RegisterGuestPage({ params }: {params: {id: string} }) {
  return(
    <RegisterGuest id={params.id} />
  );
}
