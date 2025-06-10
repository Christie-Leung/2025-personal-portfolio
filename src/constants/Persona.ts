import { Persona } from "@/types/types";

type PersonaInfoProps = {
  title: string;
  backgroundImageUrl?: string;
  navigateUrl: string;
  helperText?: string;
  theme: Persona;
  tubeTexture?: string;
}

export const personaInfo: PersonaInfoProps[] = [
  {
    title: 'A Creator',
    backgroundImageUrl: "https://i.pinimg.com/originals/e0/9d/ab/e09dab215ce9028c81d6ab7c55e3eafb.gif",
    navigateUrl: "/creator",
    helperText: 'Explore my content creation journey',
    theme: Persona.CREATOR
  },
  {
    title: 'A Developer',
    backgroundImageUrl: "https://64.media.tumblr.com/7761c8fdae6960f8d8a79b5833e64732/2d71f9e172e1e040-9b/s1280x1920/1a3a55583a557b624346be6afe008ca4a6abe83a.gif",
    navigateUrl: "/developer",
    helperText: 'View my developer journey',
    theme: Persona.DEVELOPER,
    tubeTexture: "https://minecraft.wiki/images/BlockSprite_dirt.png",
  },
  {
    title: 'A Dreamer',   
    navigateUrl: "/dreamer",
    helperText: 'Learn how I can contribute to your team',
    theme: Persona.DREAMER,
  }
]
