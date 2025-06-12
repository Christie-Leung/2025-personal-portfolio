import { Button } from "@/components";
import { twMerge } from "tailwind-merge";
import { HiDotsVertical } from "react-icons/hi";
import { useTheme } from "@/provider";

type MediaButtonProps = {
  icon: string;
  label: string; 
  link: string;
  className?: string; 
}

const MediaButton = ({
  icon,
  label,
  link,
  className = '',
}: MediaButtonProps) => {
  const { fast } = useTheme();
  return (
    <a
      href={link}
      target="_blank"
      className={twMerge(
        'flex flex-row items-center justify-between w-full md:max-w-1/2 h-7 rounded p-1 shadow-main/10 shadow-[0_0_5px_1px]',
        fast ? 'border-1 border-main/10 hover:shadow-[0_0_5px_1px] hover:shadow-main/30': 'bg-main-opposite/50 hover:scale-102 hover:bg-main-opposite/80 transition-transform duration-300',
        className,
      )}
    >
      <div className="h-5 w-5">
        <img src={icon} alt={label} className="w-5 h-5 object-cover rounded-md object-center"/>
      </div>
      <p className='whitespace-nowrap'>{label}</p>
      <Button
        variant="ghost"
        size="small"
      >
        <HiDotsVertical className="text-main"/>
      </Button>
    </a>
  )
}

export default MediaButton;