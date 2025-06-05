import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({
  children,
  className = '',
}: CardProps) => {
  return (
    <div 
      className={twMerge(className, "flex items-center justify-center p-4 rounded bg-main-opposite/30 backdrop-blur-sm border border-main-opposite/40 shadow-lg font-main")}>
      {children}
    </div>
  )
}

export default Card;