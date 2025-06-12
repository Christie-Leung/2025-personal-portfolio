type LinkProps = {
  icon: string;
  label: string;
  link: string;
}

type LinkSections = {
  sectionTitle?: string;
  links: LinkProps[];
}

export const creatorLinks: LinkSections[] = [
  {
    links: [
      {
        icon: "/assets/creator/mail.PNG",
        label: "💌 ugc + collabs",
        link: "mailto:christie.3lsy@gmail.com",
      },
      {
        icon: "/assets/creator/drink.PNG",
        label: "buy me a drink ",
        link: "https://buymeacoffee.com/christie.lsy"
      },
      {
        icon: "/assets/creator/tiktok.PNG",
        label: "tiktok",
        link: "https://www.tiktok.com/@christie.lsy",
      },
      {
        icon: "/assets/creator/youtube.PNG",
        label: "youtube",
        link: "https://www.youtube.com/@christie.3lsy?feature=shared&sub_confirmation=1"
      }
    ]
  },
  {
    sectionTitle: "» travel essentials «",
    links: [
      {
        icon: "/assets/creator/duo.PNG",
        label: "my language learning streak 🤭",
        link: "https://www.duolingo.com/profile/ChristieLeung24",
      },
      {
        icon: "/assets/creator/fraenk.PNG",
        label: "my eu phone plan",
        link: "https://fraenk.page.link/?link=https%3A%2F%2Ffraenk.de%2Fdeeplink%2Fmgm%3FfriendCode%3DCHRL907&apn=de.congstar.fraenk&amv=1040000&imv=1.4&isi=1493980266&ibi=de.congstar.fraenk&ius=fraenk&ofl=https%3A%2F%2Ffraenk.de",
      },
      {
        icon: "/assets/creator/wise.PNG",
        label: "my international debit card",
        link: "https://wise.com/invite/ihpc/christiel93",
      }
    ]
  }, 
  {
    sectionTitle: "» follow my footprints «",
    links: [
      {
        icon: "/assets/creator/rome.jpg",
        label: "🇮🇹 Rome",
        link: "https://maps.app.goo.gl/shMyQyGPtU8g14BL7?g_st=i",
      },
      {
        icon: "/assets/creator/osaka.jpg",
        label: "🇯🇵 Osaka",
        link: "https://maps.app.goo.gl/EQLMR6FBfP38x9H48"
      },
      {
        icon: "/assets/creator/kyoto.jpg",
        label: "🇯🇵 Kyoto",
        link: "https://maps.app.goo.gl/EzqMZdxePfXzbnLw8?g_st=i"
      },
      {
        icon: "/assets/creator/hk.jpg",
        label: "🇭🇰 Hong Kong",
        link: "https://maps.app.goo.gl/Vv79nSSoi3dc45C47?g_st=i"
      }
    ]
  }
];