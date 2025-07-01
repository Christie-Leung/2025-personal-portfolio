import { AnimatedBackground, Card, Content, Page, Stack, Toggles } from "@/components";
import MediaButton from "./components/MediaButton";
import { Persona } from "@/types/types";
import { creatorLinks, personaInfo } from "@/constants";
import { config } from "@/utils";


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
              <img src={`${config.baseUrl}/assets/creator_pfp.jpg`} alt="Christie Leung" className="w-full h-full rounded-full object-fill object-center" />
            </div>
            <Stack align="center" className="gap-y-0.5" marginBottom>
              <h4>Christie Leung</h4>
              <p>christie.3lsy@gmail.com ♡</p>
            </Stack>
            <Stack align="center">
              {creatorLinks.map((section) => (
                <div key={section.sectionTitle} className="w-full h-full flex flex-col justify-center items-center text-center gap-y-2">
                  {section.sectionTitle && <h5>{section.sectionTitle}</h5>}
                  {section.links.map((link, linkIndex) => (
                    <MediaButton
                      key={linkIndex}
                      icon={link.icon}
                      label={link.label}
                      link={link.link}
                    />
                  ))}
                </div>
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