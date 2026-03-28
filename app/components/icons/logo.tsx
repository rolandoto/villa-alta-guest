import Image from 'next/image';
import clsx from 'clsx';

export default function LogoIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <Image
      src="/villa.png"
      alt="Emberis logo"
      width={200}
      height={50}
      priority
      sizes="(max-width: 780px) 150px, 238px"
      className={clsx(className)}
    />
  );
}

