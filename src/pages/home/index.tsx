import { Button, Card, Content, Page, Stack, ThemeToggle } from "@/components";
import { useTheme } from "@/provider";
import { Persona } from "@/types/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tunnel } from "@/animations";
import { twMerge } from "tailwind-merge";

type ButtonInfoProps = {
  title: string;
  backgroundImageUrl?: string;
  onNavigate: () => void;
  helperText?: string;
  theme: Persona;
  tubeTexture?: string;
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<Persona | null>(null);;
  const [startTunnel, setStartTunnel] = useState(false);

  const buttons: ButtonInfoProps[] = [
    {
      title: 'A Creator',
      backgroundImageUrl: "https://i.pinimg.com/originals/e0/9d/ab/e09dab215ce9028c81d6ab7c55e3eafb.gif",
      onNavigate: () => navigate("/creator"),
      helperText: 'Explore my content creation journey',
      theme: Persona.CREATOR
    },
    {
      title: 'A Developer',
      backgroundImageUrl: "https://64.media.tumblr.com/7761c8fdae6960f8d8a79b5833e64732/2d71f9e172e1e040-9b/s1280x1920/1a3a55583a557b624346be6afe008ca4a6abe83a.gif",
      onNavigate: () => navigate("/developer"),
      helperText: 'View my developer journey',
      theme: Persona.DEVELOPER,
      tubeTexture: "https://minecraft.wiki/images/BlockSprite_dirt.png",
    },
    {
      title: 'A Dreamer',   
      onNavigate: () => navigate("/dreamer"),
      helperText: 'Learn how I can contribute to your team',
      theme: Persona.DREAMER,
    }
  ]

  const { setAdditionalThemes } = useTheme();

  const defaultImage = null;
  const [firstImgUrl, setFirstImgUrl] = useState<string | null>(defaultImage);
  const [secondImgUrl, setSecondImgUrl] = useState<string | null>(defaultImage);

  const [flipImgUrl, setFlipImgUrl] = useState<boolean>(false);

  
  useEffect(() => {
    const persona = localStorage.getItem("vite-ui-additional-theme") as Persona;

    if (!persona) return;

    setActive(persona);
    setFirstImgUrl(buttons.filter(button => button.theme === persona)[0]?.backgroundImageUrl || defaultImage);
    setSecondImgUrl(buttons.filter(button => button.theme === persona)[0]?.backgroundImageUrl || defaultImage);
    setFlipImgUrl(false);
  }, [location.pathname]);
  
  return (
    <Page className="home bg-neutral flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full">
        {firstImgUrl && <img 
          src={firstImgUrl}
          className={twMerge(
            "transition-all ease-in-out duration-1500 w-full h-full object-cover contrast-70 brightness-150 dark:brightness-50",
            flipImgUrl ? "opacity-0" : "opacity-100"
          )}
        />}
        {secondImgUrl && <img 
          src={secondImgUrl}
          className={twMerge(
            "fixed top-0 left-0 transition-all ease-in-out duration-1500 w-full h-full object-cover contrast-70 brightness-150 dark:brightness-50",
            !flipImgUrl ? "opacity-0" : "opacity-100"
          )}
        />}
      </div>
      <Tunnel 
        started={startTunnel}
        tubeTextureImg={active ? buttons.filter(button => button.theme === active)[0]?.tubeTexture : undefined}
        onAnimationEnd={() => {
          buttons.filter(button => button.theme === active)[0].onNavigate();
        }}
        className={twMerge(
          "transition-opacity duration-500 ease-in-out",
          startTunnel ? "opacity-100" : "opacity-0"
        )}
      />
      <Content 
        className={twMerge(
          "md:py-2 md:px-4 lg:py-4 lg:px-8 xl:py-8 xl:px-16 2xl:py-12 2xl:px-40 h-full",
          startTunnel ? "opacity-0" : "opacity-100"
        )}>
        <Card
          className="w-full h-full relative"
        >
          <>
            <ThemeToggle 
              className="absolute top-2 right-2"
            />
            <Stack align="center">
              <Stack align="center" className="text-center gap-y-1" marginBottom>
                <h4>welcome to the space of </h4>
                <span className="relative group">
                  <h1 className="heading-text">Christie Leung</h1>
                </span>
              </Stack>
              <Stack align="center" className="gap-y-1">
                <p>What do you know me as?</p>
                <Stack align="center" inline marginBottom>
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant="primary"
                      onClick={() => {
                        
                        setActive(button.theme);
                        if (flipImgUrl) {
                          setFirstImgUrl(button.backgroundImageUrl || defaultImage);
                        } else {
                          setSecondImgUrl(button.backgroundImageUrl || defaultImage);
                        }

                        setFlipImgUrl(!flipImgUrl);
                        setAdditionalThemes(button.theme);
                      }}
                      helperText={button.helperText}
                      active={active === button.theme}
                      showTransition
                    >
                      {button.title}
                    </Button>
                  ))}
                </Stack>
                {active && (
                  <Button
                    variant="accent"
                    size="medium"
                    className={twMerge(
                      "mt-1 md:mt-4",
                      active ? "opacity-100 scale-105" : "opacity-0"
                    )}
                    onClick={() => setStartTunnel(true)}
                    showTransition
                  >
                    {'Enter the Space'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </>
        </Card>
      </Content>

    </Page>
  )
}

export default Home;