import { 
  Button as HButton,
  ButtonProps as HButtonProps,
 } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ElementType, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps<T extends ElementType = 'button'> = HButtonProps<T> & {
  children: string | React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  helperText?: string;
}

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'medium',
  helperText,
  ...props
}: ButtonProps) => {

  const [hovered, setHovered] = useState(false);

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-darker hover:shadow-lg hover:scale-105 shadow-md',
    secondary: 'bg-white/20 text-main hover:bg-white/40 border border-primary text-primary hover:primary-lighter backdrop-blur-md ',
    tertiary: 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-50',
  };

  const sizeClasses = {
    small: 'text-sm px-2 py-1',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-6 py-3',
  };

  return (
    <div
      className="relative flex w-fit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <HButton 
        className={twMerge(
          className, 
          'flex items-center justify-center rounded px-4 py-2 transition-all duration-300 font-main', 
          variantClasses[variant], 
          sizeClasses[size]
        )} 
        {...props}
      >
        {children}
      </HButton>
      {helperText && hovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-main text-main-opposite rounded-xl text-sm shadow-lg whitespace-nowrap z-10"
        >
          {helperText}
        </motion.div>
      )}
    </div>
  );
}


export default Button;