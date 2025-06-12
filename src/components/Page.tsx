import { Cursor } from "@/animations";
import { twMerge } from "tailwind-merge";
import { isMobile } from "react-device-detect";
import { useTheme } from "@/provider";

type PageProps = {
  children: React.ReactNode;
  className?: string;
};

const Page = ({
  children,
  className = '',
}: PageProps) => {
  const { fast } = useTheme();
  return (
    <div
      className={twMerge(
        'relative h-full p-4 w-screen overflow-y-scroll min-h-screen flex items-center justify-center bg-neutral', 
        className
      )}
    >
      {!isMobile && !fast && <Cursor />}
      {children}
    </div>
  );
}

export default Page;