import { AnimatedBackground, Card, Content, Page, Stack, Toggles } from "@/components";
import MediaButton from "./components/MediaButton";
import { Persona } from "@/types/types";
import { creatorLinks, personaInfo, travels } from "@/constants";


const CreatorPage = () => {
  return (
    <Page>
      <AnimatedBackground
        imageUrl={personaInfo.filter(persona => persona.theme === Persona.CREATOR)[0].backgroundImageUrl || ''}
      />
      <Content>
        <Card className="relative w-full items-center justify-center flex flex-col">
          <Toggles />
          <Stack
            className="w-full"
            align="center"
            marginBottom
          >
            <div className="w-12 h-12 rounded-full">
              <img src="./src/assets/creator_pfp.jpg" alt="Christie Leung" className="w-full h-full rounded-full object-fill object-center" />
            </div>
            <h4>Christie Leung</h4>
            <Stack align="center">
              {creatorLinks.map((link, index) => (
                <MediaButton
                  key={index}
                  icon={link.icon}
                  label={link.label}
                  onClick={link.onClick}
                />
              ))}
              <p>» travel essentials «</p>
              {travels.map((link, index) => (
                <MediaButton
                  key={index}
                  icon={link.icon}
                  label={link.label}
                  onClick={link.onClick}
                />
              ))}
            </Stack>

          </Stack>
          <Stack align="center">
            <div>

            </div>
          </Stack>
        </Card>
      </Content>
    </Page>
  );
}

export default CreatorPage;