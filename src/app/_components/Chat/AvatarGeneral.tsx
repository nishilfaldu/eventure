import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



interface AvatarGeneralProps {
  pictureUrl: string | undefined;
  firstName: string;
  lastName: string;
}

export function AvatarGeneral({ pictureUrl, firstName, lastName } : AvatarGeneralProps) {
  return(
    <Avatar className="h-8 w-8">
      <AvatarImage alt="User Avatar" src={pictureUrl}/>
      <AvatarFallback>{firstName} {lastName}</AvatarFallback>
    </Avatar>
  );
}
