import { twMerge } from "tailwind-merge";

type PageProps = {
  children: React.ReactNode;
  className?: string;
};

const Page = ({
  children,
  className = '',
}: PageProps) => {
  return (
    <div
      className={twMerge('p-4 w-screen h-full min-h-screen flex items-center justify-center', className)}
    >
      {children}
    </div>
  );
}

export default Page;