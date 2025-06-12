import { twMerge } from "tailwind-merge";

type ContentProps = {
  children: React.ReactNode;
  className?: string;
  centerCard?: boolean;
};

const Content = ({
  children,
  className = '',
  centerCard = false,
}: ContentProps) => {
  return (
    <div className={twMerge(
      'z-1 w-full h-full items-center justify-center flex grow', 
      centerCard ? 'md:py-2 md:px-4 lg:py-4 lg:px-8 xl:py-8 xl:px-16 2xl:py-12 2xl:px-40' : '',
      className,
    )}>
      {children}
    </div>
  )
}

export default Content;