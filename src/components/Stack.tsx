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
    left: inline ? 'justify-start' : 'items-start',
    right: inline ? 'justify-end' : 'items-end',
    center: inline ? 'justify-center' : 'items-center',
  }

  return (
    <div className={twMerge(className, "w-full h-full flex", inline ? 'flex-row' : 'flex-col', alignment[align], marginBottom ? 'mb-4' : '',)}>
      {children}
    </div>
  )
}

export default Stack;