"use client";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { getUserHelper } from "convex/users";




interface UserBoxProps {
  data: NonNullable<Awaited<ReturnType<typeof getUserHelper>>>;
}

const UserBox: React.FC<UserBoxProps> = ({
  data,
}) => {
//   const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  //   const handleClick = useCallback(() => {
  //     setIsLoading(true);

  //     axios.post("/api/conversations", { userId: data.id })
  //       .then(data => {
  //         router.push(`/conversations/${data.data.id}`);
  //       })
  //       .finally(() => setIsLoading(false));
  //   }, [data, router]);

  return (
    <>
      {isLoading && (
        // <LoadingModal />
        <>Loading...</>
      )}
      <div
        // onClick={handleClick}
        className="
          w-full
          relative
          flex
          items-center
          space-x-3
          bg-white
          p-3
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        {/* <Avatar user={data} /> */}
        <Avatar className="h-8 w-8">
          <AvatarImage alt="User Avatar" src={data.pictureUrl}/>
          <AvatarFallback>{data.firstName[0]} {data.lastName[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.firstName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
