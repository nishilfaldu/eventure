import clsx from "clsx";



export function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 32 28"
      {...props}
      className={clsx("h-4 w-4 fill-black dark:fill-white", props.className)}
    >
      <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
      <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
    </svg>
  );
}



export function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <>
      <div
        className={clsx(
          "flex flex-none items-center justify-center border border-neutral-200 dark:border-neutral-700 dark:bg-black bg-white",
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
