import { AnimatedBackground, Button, Card, Content, Dismissible, Page, Stack, Toggles } from "@/components";
import { useTheme } from "@/provider";
import { Persona } from "@/types/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tunnel } from "@/animations";
import { twMerge } from "tailwind-merge";
import { personaInfo } from "@/constants";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [startTunnel, setStartTunnel] = useState(false);

  const { fast, setFast, setAdditionalThemes } = useTheme();

  const [target, setTarget] = useState<number>(-1);
  const [open, setOpen] = useState<boolean>(true);
  
  useEffect(() => {
    const persona = localStorage.getItem("vite-ui-additional-theme") as Persona;

    if (!persona) return;

    setTarget(personaInfo.findIndex(button => button.theme === persona));
  }, [location.pathname]);
  
  return (
    <Page className="home bg-neutral flex items-center justify-center">
      <AnimatedBackground 
        imageUrl={personaInfo.map(button => button.backgroundImageUrl || '')}
        target={target}
        setTarget={setTarget}
      />
      {!fast && (
        <Tunnel 
          started={startTunnel}
          tubeTextureImg={target ? personaInfo[target]?.tubeTexture : undefined}
          onAnimationEnd={() => {
            navigate(personaInfo[target].navigateUrl);
          }}
          className={twMerge(
            "transition-opacity duration-500 ease-in-out",
            startTunnel ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      <Content 
        className={twMerge(
          "md:py-2 md:px-4 lg:py-4 lg:px-8 xl:py-8 xl:px-16 2xl:py-12 2xl:px-40 h-full",
          startTunnel ? "opacity-0" : "opacity-100"
        )}>
        <Card
          className="w-full h-full relative"
        >
          <>
            <Toggles />
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
                  {personaInfo.map((button, index) => (
                    <Button
                      key={index}
                      variant="primary"
                      onClick={() => {
                        if (fast) {
                          navigate(personaInfo.filter(b => b.theme === button.theme)[0].navigateUrl);
                          return;
                        }
                        
                        setTarget(index);
                        setAdditionalThemes(button.theme);
                      }}
                      helperText={button.helperText}
                      active={target === index}
                      showTransition={!fast}
                    >
                      {button.title}
                    </Button>
                  ))}
                </Stack>
                {!fast && target !== -1 && (
                  <Button
                    variant="accent"
                    size="medium"
                    className={twMerge(
                      "mt-1 md:mt-4",
                      target !== -1 ? "opacity-100 scale-105" : "opacity-0"
                    )}
                    onClick={() => {
                      setStartTunnel(true)
                    }}
                    showTransition={!fast}
                  >
                    {'Enter the Space'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </>
        </Card>
      </Content>
      <Dismissible
        open={open}
        setOpen={setOpen}
      >
        <span>
          {'You are on the optimized version of this page. Click '}
          <button
            onClick={() => {
              setFast(false);
              setOpen(false);
            }}
            className="hover:cursor-pointer underline text-link"
          >
            here
          </button>
          {' to see the full version.'}
        </span>
      </Dismissible>
    </Page>
  )
}

export default Home;