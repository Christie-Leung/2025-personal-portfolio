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
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link' | 'accent' | 'button-outline';
  size?: 'small' | 'medium' | 'large';
  helperText?: string;
  active?: boolean;
  showTransition?: boolean;
}

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'medium',
  helperText,
  active = false,
  showTransition = false,
  ...props
}: ButtonProps) => {

  const [hovered, setHovered] = useState(false);

  const variantClasses = {
    primary: 'primary bg-primary text-white hover:bg-primary-darker hover:shadow-lg shadow-md',
    secondary: 'bg-white/20 text-main hover:bg-white/40 border border-primary text-primary hover:primary-lighter backdrop-blur-md ',
    tertiary: 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-50',
    ghost: 'bg-transparent hover:bg-gray-100',
    link: 'text-link hover:italic underline hover:underline-offset-2',
    accent: 'text-accent font-accent hover:underline',
    'button-outline': 'border border-primary-darker text-primary-darker',
  };

  const sizeClasses = {
    small: 'text-xs sm:text-sm p-1',
    medium: 'text-sm sm:text-base px-4 py-2',
    large: 'text-base sm:text-lg px-6 py-3',
  };

  return (
    <div
      className={twMerge(
        "relative flex rounded",
        active ? 'ring-1 ring-main p-[0.1rem]' : '',
        showTransition && !active ? 'hover:scale-105 transition-transform duration-300' : '',
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <HButton 
        className={twMerge(
          className, 
          variant,
          'flex items-center justify-center rounded px-4 py-2 transition-all duration-300 font-main', 
          variantClasses[variant], 
          sizeClasses[size]
        )} 
        {...props}
      >
        <span>{children}</span>
      </HButton>
      {helperText && hovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="animation absolute top-0 lg:top-full -mt-6 lg:mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-main text-main-opposite rounded text-sm shadow-lg whitespace-nowrap z-100"
        >
          {helperText}
        </motion.div>
      )}
    </div>
  );
}


export default Button;