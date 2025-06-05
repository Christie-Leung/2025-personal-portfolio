import { twMerge } from "tailwind-merge";

type StackProps = {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
  align?: 'left' | 'right' | 'center';
  marginBottom?: boolean;
};

const Stack = ({ 
  children, 
  className = '',
  inline = false,
  align = 'left',
  marginBottom = false,
}: StackProps) => {

  const alignment = {
    left: inline ? 'items-center md:justify-start' : 'items-start',
    right: inline ? 'items-center md:justify-end' : 'items-end',
    center: inline ? 'items-center md:justify-center' : 'items-center',
  }

  return (
    <div className={twMerge(
      "w-full flex", 
      inline ? 'flex-col gap-y-2 lg:flex-row lg:gap-x-2' : 'flex-col gap-y-2', 
      alignment[align], 
      marginBottom ? 'mb-1 md:mb-4' : '',
      
      className,
    )}>
      {children}
    </div>
  )
}

export default Stack;