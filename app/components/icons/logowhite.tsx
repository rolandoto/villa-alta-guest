import clsx from "clsx";
import Image from "next/image";

export default function LogoIconwhite({
  className,
}: {
  className?: string;
}) {
  return (
    <Image
      src="/logowhite.png"
      alt="Emberis logo"
      width={200}
      height={50}
      priority
      sizes="(max-width: 780px) 150px, 238px"
      className={clsx(className)}
    />
  );
}