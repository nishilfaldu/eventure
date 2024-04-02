import { RegisterGuest } from "@/app/_components/emails/RegisterGuest";



export default function RegisterGuestPage({ params }: {params: {id: string} }) {
  return(
    <RegisterGuest id={params.id} />
  );
}
