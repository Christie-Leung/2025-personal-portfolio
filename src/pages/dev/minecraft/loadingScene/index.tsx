import { Button, Content, Page, Stack } from "@/components"
import { useTheme } from "@/provider";
import { Persona } from "@/types/types";
import { useNavigate } from "react-router-dom";

const LoadingScene = () => {
  const { setAdditionalThemes } = useTheme();
  const navigate = useNavigate();

  setAdditionalThemes(Persona.DEVELOPER);

  return (
    <Page>
      <div className="fixed top-0 left-0 w-full h-full">
        <div
          className="w-full h-full bg-repeat bg-[url('https://minecraft.wiki/images/BlockSprite_dirt.png')]"
        />
        <img
          src="https://minecraft.wiki/images/BlockSprite_dirt.png"
        />
      </div>
      <Content>
        <Stack align="center" className="w-fit md:mx-50">
          <h3 className="text-white">WIP: Still in Progress</h3>
          <Button
            variant="primary"
            size="medium"
            className="w-full"
            onClick={() => window.location.href = "https://christie.dev.murphyshome.net"}
          >
            <span>Navigate to the Old Page</span>
          </Button>
          <Button
            variant="primary"
            size="medium"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            <span>Go Back</span>
          </Button>
        </Stack>
      </Content>
    </Page>
  )
}

export default LoadingScene;