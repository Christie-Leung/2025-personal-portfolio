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
    <Page className="home">
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
          startTunnel ? "opacity-0" : "opacity-100"
        )}
      >
        <Card
          className="w-full md:w-fit h-full p-10 relative"
        >
          <>
            <Toggles />
            <Stack align="center" className="md:w-fit">
              <Stack align="center" className="text-center gap-y-1" marginBottom>
                <h4>welcome to the space of </h4>
                <span className="relative group">
                  <h1 className="heading-text whitespace-nowrap">Christie Leung</h1>
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
                {target !== -1 && (
                  <Button
                    variant="accent"
                    size="medium"
                    className={twMerge(
                      "mt-1",
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
      {<Dismissible
        open={open}
        setOpen={setOpen}
        storageKey="vite-ui-fast-mode-dismissed"
      >
        <span>
          {'You are on the animated version of this page. Click '}
          <button
            onClick={() => {
              setFast(true);
              setOpen(false);
            }}
            className="hover:cursor-pointer hover:font-bold underline text-link"
          >
            here
          </button>
          {' to see to hide the animations.'}
        </span>
      </Dismissible>
    }
    </Page>
  )
}

export default Home;