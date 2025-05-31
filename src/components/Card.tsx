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
      className={twMerge(className, "flex justify-center p-4 rounded bg-main-opposite/40 backdrop-blur-sm border border-main-opposite/60 shadow-lg font-main")}>
      {children}
    </div>
  )
}

export default Card;