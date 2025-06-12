import { personaInfo, PersonaInfoProps } from "@/constants";
import { useTheme } from "@/provider";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type AnimatedBackgroundProps = {
  imageUrl: string | string[];
  target?: number;
  setTarget?: (target: number) => void;
}

const AnimatedBackground = ({
  imageUrl,
  target = 0,
  setTarget,
}: AnimatedBackgroundProps) => {

  const { fast, additionalThemes } = useTheme();

  let defaultImage = imageUrl instanceof Array ? imageUrl[0] : imageUrl;
  if (additionalThemes) {
    defaultImage = personaInfo.filter((persona: PersonaInfoProps) => persona.theme === additionalThemes)[0]?.backgroundImageUrl || defaultImage;
  }

  const [firstImgUrl, setFirstImgUrl] = useState<string | null>(defaultImage);
  const [secondImgUrl, setSecondImgUrl] = useState<string | null>(defaultImage);

  const [flipImgUrl, setFlipImgUrl] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl instanceof Array) {
      setFirstImgUrl(imageUrl[target] || defaultImage);
      if (setTarget) {
        setSecondImgUrl(imageUrl[target] || defaultImage);
      }
      setFlipImgUrl(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!setTarget) return;

    if (flipImgUrl) {
      setFirstImgUrl(imageUrl[target] || defaultImage);
    } else {
      setSecondImgUrl(imageUrl[target] || defaultImage);
    }
    setFlipImgUrl(!flipImgUrl);
  }, [target]);

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      {!fast && firstImgUrl && <img 
        src={firstImgUrl}
        className={twMerge(
          "transition-all ease-in-out duration-1500 w-full h-full object-cover contrast-70 brightness-150 dark:brightness-50",
          flipImgUrl ? "opacity-0" : "opacity-100"
        )}
      />}
      {!fast && secondImgUrl && <img 
        src={secondImgUrl}
        className={twMerge(
          "fixed top-0 left-0 transition-all ease-in-out duration-1500 w-full h-full object-cover contrast-70 brightness-150 dark:brightness-50",
          !flipImgUrl ? "opacity-0" : "opacity-100"
        )}
      />}
    </div>
  )
}

export default AnimatedBackground;