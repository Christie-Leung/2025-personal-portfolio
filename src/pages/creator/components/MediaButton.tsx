import { Button } from "@/components";
import { twMerge } from "tailwind-merge";
import { HiDotsVertical } from "react-icons/hi";
import { useTheme } from "@/provider";

type MediaButtonProps = {
  icon: string;
  label: string; 
  onClick: () => void;
  className?: string; 
}

const MediaButton = ({
  icon,
  label,
  onClick,
  className = '',
}: MediaButtonProps) => {
  const { fast } = useTheme();
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'flex flex-row items-center justify-between w-full h-6 rounded-full p-2 shadow',
        fast ? 'border-1 border-main/10': 'bg-main-opposite/50 hover:scale-102 hover:bg-main-opposite/80 transition-transform duration-300',
        className,
      )}
    >
      <div className="h-4 w-4">
        <img src={icon} alt={label} className="w-4 h-4 object-contain object-center"/>
      </div>
      <span className=''>{label}</span>
      <Button
        variant="ghost"
        size="small"
      >
        <HiDotsVertical />
      </Button>
    </div>
  )
}

export default MediaButton;