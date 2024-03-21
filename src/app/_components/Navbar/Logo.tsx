import clsx from "clsx";



export function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.NEXT_PUBLIC_SITE_NAME} logo`}
      viewBox="0 0 32 28"
      {...props}
      className={clsx("h-4 w-4 fill-white dark:fill-black", props.className)}
    >
      <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
      <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
    </svg>
  );
}

export function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="15" height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={"chevron down logo"}
      {...props}
    >
      <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
      </path>
    </svg>
  );
}



export function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <>
      <div
        className={clsx(
          "flex flex-none items-center justify-center border border-neutral-200 dark:border-neutral-700 dark:bg-white bg-black",
          {
            "h-[40px] w-[40px] rounded-xl": !size,
            "h-[30px] w-[30px] rounded-lg": size === "sm",
          }
        )}
      >
        <LogoIcon
          className={clsx({
            "h-[16px] w-[16px]": !size,
            "h-[10px] w-[10px]": size === "sm",
          })}
        />
      </div>
      {/* <div className="ml-2 flex-none text-base font-medium uppercase lg:block">7WEST</div> */}
      <span className="ml-3 text-xl">Eventure</span>
    </>

  );
}
