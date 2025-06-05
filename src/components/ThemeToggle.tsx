import { useTheme } from "@/provider";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Theme } from "@/types/types";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

type ThemeToggleProps = {
  className?: string;
}

const ThemeToggle = ({
  className = '',
  ...props
}: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={twMerge(
      className,
      'overflow-visible'
      )}  
      {...props}
    >
      <Button
        variant="button-outline"
        size="small"
        className="hover:opacity-100 opacity-80 hover:bg-main-opposite/90"
        onClick={() => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
      >
        {theme === 'light' ? (
          <MdDarkMode />
        ) : (
          <MdLightMode />
        )}
      </Button>
    </div>
  )
}

export default ThemeToggle;