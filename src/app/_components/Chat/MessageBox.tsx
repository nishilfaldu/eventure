import { AvatarGeneral } from "./AvatarGeneral";



interface MessageBoxProps {
  messageText: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export function MessageBox({ messageText, firstName, lastName, pictureUrl } : MessageBoxProps) {
  return(
    <div className="flex items-start no-overflow-anchoring">
      <AvatarGeneral firstName={firstName} lastName={lastName} pictureUrl={pictureUrl} />
      <div className="ml-4 p-2 rounded-lg bg-gray-100/40 dark:bg-gray-800/40">
        <div className="font-semibold">{firstName} {lastName}</div>
        {messageText}
      </div>
    </div>
  );
}
