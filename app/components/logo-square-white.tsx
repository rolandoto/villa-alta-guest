import clsx from 'clsx';
import LogoIcon from './icons/logo';
import LogoIconwhite from './icons/logowhite';

type LogoSquareProps = {
  size?: 'sm' | 'md';
  className?: string;
};

export default function LogoSquarewhite({
  size = 'md',
  className,
}: LogoSquareProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        size === 'sm' && 'h-32 w-64',
        size === 'md' && 'h-32 w-52',
        className
      )}>
      <LogoIconwhite
        className={clsx(
          'w-full h-full transition-colors duration-300'
        )}
      />
    </div>
  );
}
