import { FloatingStar } from "@/animations";
import { Button, Card, Content, Page, Stack } from "@/components";
import { useTheme } from "@/provider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ButtonInfoProps = {
  title: string;
  backgroundImageUrl?: string;
  onClick: () => void;
  helperText?: string;
  theme: 'creator' | 'developer' | 'dreamer';
}

const Home = () => {
  const navigate = useNavigate();

  const buttons: ButtonInfoProps[] = [
    {
      title: 'A Creator',
      backgroundImageUrl: "https://i.pinimg.com/originals/e0/9d/ab/e09dab215ce9028c81d6ab7c55e3eafb.gif",
      onClick: () => navigate("/creator"),
      helperText: 'Explore my content creation journey',
      theme: 'creator'
    },
    {
      title: 'A Developer',
      onClick: () => navigate("/developer"),
      helperText: 'View my developer journey',
      theme: 'developer'
    },
    {
      title: 'A Dreamer',
      onClick: () => navigate("/dreamer"),
      helperText: 'Learn how I can contribute to your team',
      theme: 'dreamer'
    }
  ]

  const { setAdditionalThemes } = useTheme();

  const defaultImage = "https://www.cit.tum.de/fileadmin/_processed_/f/9/csm_Parabelrutsche_FF_88d0d71b3d.jpg";
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);

  

  return (
    <Page className="bg-neutral">
      <div className="absolute inset-0 overflow-hidden">
          <img 
            src={imageUrl}
            className="transition-all ease-in-out duration-300 w-full h-full object-cover contrast-70 brightness-150 dark:brightness-50"
          />
      </div>
      <Content>
        <Card
          className="w-full h-full"
        >
          <>
            <Stack align="center">
              <Stack align="center" marginBottom>
                <h4>welcome to the space of </h4>
                <span className="relative group">
                  <h1 className="heading-glow">Christie Leung</h1>
                </span>
              </Stack>
              <Stack align="center" className="gap-y-1">
                <p>What do you know me as?</p>
                <Stack className="gap-x-2 contents" align="center" inline>
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant="primary"
                      onClick={button.onClick}
                      helperText={button.helperText}
                      onMouseEnter={() => {
                      setImageUrl(button.backgroundImageUrl || defaultImage)
                      setAdditionalThemes(button.theme);
                    }}
                    onMouseLeave={() => {
                      setImageUrl(defaultImage);
                      setAdditionalThemes(undefined);
                    }}
                    >
                      {button.title}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </>
        </Card>
      </Content>
    </Page>
  )
}

export default Home;