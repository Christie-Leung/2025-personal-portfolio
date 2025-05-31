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
    <div className={twMerge('w-full items-center justify-center p-4 flex', className)}>
      {children}
    </div>
  )
}

export default Content;