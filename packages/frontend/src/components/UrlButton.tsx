import { GlobeIcon, ArrowUpRight } from "lucide-react"
import { LuGithub, LuLinkedin, LuInstagram } from "react-icons/lu"
import { SocialUrl } from "~/generated/models/SocialUrl"
import { UrlType } from "~/generated/models/UrlType"
import { cn } from "~/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"

type UrlButtonProps = React.ComponentProps<typeof Button> & {
  socialUrl: SocialUrl
  showText?: boolean
  coloured?: boolean
}

const UrlButton = ({
  socialUrl,
  showText = false,
  coloured = false,
  ...buttonProps
}: UrlButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const link = socialUrl.link

  const platformConfig: Record<
    UrlType,
    {
      icon: React.ComponentType<any>
      label: string
      bgClass: string
      iconColorClass: string
      textColorClass: string
    }
  > = {
    [UrlType.Website]: {
      icon: GlobeIcon,
      label: "View Website",
      bgClass: "bg-zinc hover:bg-zinc/20",
      iconColorClass: "text-zinc",
      textColorClass: "text-zinc",
    },
    [UrlType.GitHub]: {
      icon: LuGithub,
      label: "Github",
      bgClass: "bg-black hover:bg-gray-900",
      iconColorClass: "text-white",
      textColorClass: "text-white",
    },
    [UrlType.LinkedIn]: {
      icon: LuLinkedin,
      label: "LinkedIn",
      bgClass: "bg-blue-700 hover:bg-blue-800",
      iconColorClass: "text-white",
      textColorClass: "text-white",
    },
    [UrlType.Instagram]: {
      icon: LuInstagram,
      label: "Instagram",
      bgClass: "bg-pink-500 hover:bg-pink-600",
      iconColorClass: "text-white",
      textColorClass: "text-white",
    },
  }

  const config = platformConfig[socialUrl.platform as UrlType]
  if (!config) return null

  // decide which icon to render
  const IconToShow = isHovered ? ArrowUpRight : config.icon

  return (
    <Button
      onClick={() => window.open(link)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex flex-col items-center justify-center rounded-full p-3",
        { [config.bgClass]: coloured },
        buttonProps.className
      )}
      {...buttonProps}
    >
      <IconToShow
        className={cn("w-6 h-6", { [config.iconColorClass]: coloured })}
      />
      {showText && (
        <span
          className={cn(
            "mt-1 text-sm font-medium",
            { [config.textColorClass]: coloured }
          )}
        >
          {config.label}
        </span>
      )}
    </Button>
  )
}

export default UrlButton
