import { useTheme } from "@/provider";
import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({
  children,
  className = '',
}: CardProps) => {
  const { fast } = useTheme();
  return (
    <div 
      className={twMerge(
        "flex items-center justify-center p-4 rounded bg-main-opposite/30 border border-main-opposite/40 shadow-lg font-main",
        !fast && "backdrop-blur-sm",
        className, 
      )}>
      {children}
    </div>
  )
}

export default Card;