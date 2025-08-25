
import { ProjectId } from "@2025-personal-portfolio/common/src/ids/ProjectId";
import { Project } from "~/generated/models/Project";
import { ProjectStatus } from "~/generated/models/ProjectStatus";
import { UrlType } from "~/generated/models/UrlType";


export const projects: Project[] = [
  {
    id: new ProjectId(),
    name: "Dueling",
    slug: "dueling",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Bukkit plugin enabling head-to-head duels on a multiplayer Minecraft server (300+ active players). Built and maintained in collaboration with an international staff team."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Implemented duel flows with command and event handlers on the Bukkit API.",
            "Focused on clear player feedback and lightweight, server-friendly logic.",
            "Stack: Java, Gradle, Bukkit."
          ]
        }
      ]
    },
    tags: ["Java", "Gradle", "Minecraft", "Bukkit"],
    status: ProjectStatus.Completed,
    reviews: [],
    link: [],
    appIcon: "/assets/projects/dueling_app.jpg",
    banner: "/assets/projects/dueling_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "Personal Website",
    slug: "personal-website",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Continuously evolving portfolio used to prototype modern frontend patterns and 3D interactions."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Iterated from static pages to a component-driven React/Next.js setup with Tailwind.",
            "Experimented with Three.js for lightweight 3D visuals and interactive sections.",
            "Earlier blog experiments were backed by Firebase; redesign in progress.",
            "Stack (current focus): React/Next.js, TypeScript, Tailwind CSS, Three.js."
          ]
        }
      ]
    },
    tags: ["TypeScript", "React", "Tailwind CSS", "Three.js", "Firebase"],
    status: ProjectStatus.InDevelopment,
    reviews: [],
    link: [
      { platform: UrlType.Website, link: "https://christie.murphyshome.net" },
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/2025-personal-portfolio" }
    ],
    appIcon: "/assets/projects/personalweb_app.jpg",
    banner: "/assets/projects/personalweb_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "Fullstack E-commerce Platform",
    slug: "fullstack-ecommerce-platform",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Shopify-inspired study project built to deepen full-stack fundamentals across product, cart, and admin surfaces."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Implemented typed UI components and product flows end-to-end.",
            "Designed relational schemas and server logic for core commerce entities.",
            "Stack: Next.js, React, TypeScript, MySQL."
          ]
        }
      ]
    },
    tags: ["Next.js", "React", "TypeScript", "MySQL"],
    status: ProjectStatus.Archived,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/fullstack-ecommerce-web" }
    ],
    appIcon: "/assets/projects/ecommerce_app.jpg",
    banner: "/assets/projects/ecommerce_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },
  {
    id: new ProjectId(),
    name: "Upcycled Fashion Platform",
    slug: "upcycled-fashion-platform",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "B2B2C concept connecting fashion-waste donors with upcycling creators to enable low-waste collections."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Conducted 20+ street interviews for early user/market validation.",
            "Drafted product/brand narrative and designed a pitch deck for the circular model.",
            "Stack (prototype): Next.js + simple marketing site; repository now archived."
          ]
        }
      ]
    },
    tags: ["Market Research", "User Research", "Sustainable Development", "Entrepreneurship", "Startups"],
    status: ProjectStatus.Archived,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/kuzzi" },
      { platform: UrlType.Website, link: "https://kuzzi.vercel.app/" }
    ],
    appIcon: "/assets/projects/upcycle_app.png",
    banner: "/assets/projects/upcycle_banner.png",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },
  {
    id: new ProjectId(),
    name: "EduResource Analytics",
    slug: "eduresource-analytics",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Learning-analytics hackathon project using classical ML to explore student/resource data and prototype a PDF→MCQ tool."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Built models (Random Forest, Linear Regression, PCA+simple NN) and reduced test error by ~29.3%.",
            "Implemented a small web app that converts PDFs into multiple-choice quizzes.",
            "Stack: Python, scikit-learn, Pandas, NumPy; Jupyter notebooks for exploration."
          ]
        }
      ]
    },
    tags: ["Machine Learning", "Python", "scikit-learn", "Pandas", "NumPy", "Project Management", "Web App"],
    status: ProjectStatus.Completed,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/hack-la-2023" },
      { platform: UrlType.Website, link: "https://events.ctlt.ubc.ca/events/2023-fall-learning-analytics-hackathon/" }
    ],
    appIcon: "/assets/projects/eduresource_app.jpg",
    banner: "/assets/projects/eduresource_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "MentHer",
    slug: "menther",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Virtual mentorship web app for events, workshops, and resources — built during MLH TechTogether and placed 1st overall."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Bootstrapped with Next.js + Tailwind; used Chakra UI, Emotion, and Framer Motion for UI polish.",
            "Focused on clear IA for mentor/mentee discovery and event browsing.",
            "Stack: Next.js, JavaScript, Tailwind CSS, Chakra UI, Emotion, Framer Motion."
          ]
        }
      ]
    },
    tags: ["Next.js", "Firebase", "JavaScript", "Tailwind CSS", "Teamwork"],
    status: ProjectStatus.Completed,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/MentHer" }
    ],
    appIcon: "/assets/projects/menther_app.jpg",
    banner: "/assets/projects/menther_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "CommuniTrip",
    slug: "communitrip",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Group trip-planner built at cmd-f 2023; lets users co-plan trips and uses an AI chatbox for recommendations."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Core features: city selection, invites, collaborative ideas for places/food/accommodations/cost-sharing.",
            "Built with React.js and Cohere API for natural-language suggestions; Firebase for storage.",
            "Shipped major features in ~23 hours with a mostly first-time team."
          ]
        }
      ]
    },
    tags: ["React", "Firebase", "AI", "Teamwork"],
    status: ProjectStatus.Completed,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/Communitrip" },
      { platform: UrlType.Website, link: "https://devpost.com/software/communitrip" }
    ],
    appIcon: "/assets/projects/communitrip_app.jpg",
    banner: "/assets/projects/communitrip_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "Applane",
    slug: "applane",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Java desktop app for flight booking and passenger management; course project with documented requirements and UML."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Features: registration, booking/cancel, view itineraries, login persistence.",
            "Included event logging and discussion of refactoring to singletons/iterables.",
            "Stack: Java; UML design and simple JSON persistence."
          ]
        }
      ]
    },
    tags: ["Java", "Teamwork", "TDD", "UI/UX"],
    status: ProjectStatus.Completed,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/Applane" }
    ],
    appIcon: "/assets/projects/applane_app.jpg",
    banner: "/assets/projects/applane_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "Vela Discord Bot",
    slug: "vela-discord-bot",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Discord bot for community management and productivity."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Role & channel management, chat moderation, reminders/events, and fun commands.",
            "Implemented with Java + Maven; organized commands for extensibility.",
            "Stack: Java (JDA), Maven."
          ]
        }
      ]
    },
    tags: ["Java", "MySQL", "Discord Bot", "Raspberry Pi"],
    status: ProjectStatus.Archived,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/VelaDiscordBot" }
    ],
    appIcon: "/assets/projects/veladiscord_app.jpg",
    banner: "/assets/projects/veladiscord_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "Social Media Helper",
    slug: "social-media-helper",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Guided Discord helper built as a 2-person project — split into a Python/Flask web app, a Java Discord bot, and a Spring Boot REST API over MySQL."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Web app scrapes/teaches Discord usage; bot serves command-based guidance.",
            "REST API stores images/instructions; Postman used to seed/update data.",
            "Stack: Python (Flask, Selenium, NumPy), Java (Spring Boot), MySQL."
          ]
        }
      ]
    },
    tags: ["Flask", "Python", "Spring Framework", "Java", "MySQL", "Teamwork"],
    status: ProjectStatus.Completed,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/Social-Media-Helper" }
    ],
    appIcon: "/assets/projects/socialmediahelper_app.jpg",
    banner: "/assets/projects/socialmediahelper_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  },

  {
    id: new ProjectId(),
    name: "DoctorEZ",
    slug: "doctorez",
    description: {
      blocks: [
        {
          type: "paragraph",
          text:
            "Spring Boot app for clinic scheduling and patient management with MySQL storage."
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Tracks doctors/nurses/patients, appointments, and medicine reminders/refills.",
            "Built REST endpoints and domain models; packaged with Maven.",
            "Stack: Java (Spring Boot), MySQL."
          ]
        }
      ]
    },
    tags: ["Spring Framework", "Java", "MySQL"],
    status: ProjectStatus.Completed,
    reviews: [],
    link: [
      { platform: UrlType.GitHub, link: "https://github.com/Christie-Leung/DoctorEZ-Application" }
    ],
    appIcon: "/assets/projects/doctorez_app.jpg",
    banner: "/assets/projects/doctorez_banner.jpg",
    createdAt: new Date("2025-08-10T00:00:00Z"),
    updatedAt: new Date("2025-08-10T00:00:00Z")
  }
];
