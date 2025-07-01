import { twMerge } from "tailwind-merge";

type ContentProps = {
  children: React.ReactNode;
  className?: string;
};

const Content = ({
  children,
  className = '',
}: ContentProps) => {
  return (
    <div className={twMerge(
      'z-1 w-full h-full items-center justify-center flex grow',
      className,
    )}>
      {children}
    </div>
  )
}

export default Content;