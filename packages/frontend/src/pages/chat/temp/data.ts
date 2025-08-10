import type { ChatMessage } from "@/generated/models/ChatMessage";
import type { Company } from "@/generated/models/Company";
import type { Conversation } from "@/generated/models/Conversation";
import type { Experience } from "@/generated/models/Experience";
import type { MessageBlock } from "@/generated/models/MessageBlock";
import { MessageRole } from "@/generated/models/MessageRole";
import { WorkLocationType } from "@/generated/models/WorkLocationType";
import { ChatMessageId } from "@2025-personal-portfolio/common/src/ids/ChatMessageId";
import { CompanyId } from "@2025-personal-portfolio/common/src/ids/CompanyId";
import { ConversationId } from "@2025-personal-portfolio/common/src/ids/ConversationId";
import { ExperienceBulletId } from "@2025-personal-portfolio/common/src/ids/ExperienceBulletId";
import { WorkExperienceId } from "@2025-personal-portfolio/common/src/ids/WorkExperienceId";

const companies: Company[] = [
  {
    id: new CompanyId(),
    name: "Brandmachine GmbH",
    location: "Munich, Germany",
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },
  {
    id: new CompanyId(),
    name: "Minecraft Server (Bukkit API) – Volunteer",
    location: "Remote",
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },
  {
    id: new CompanyId(),
    name: "Common Ground Social Network Inc.",
    location: "Vancouver, BC",
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },
  {
    id: new CompanyId(),
    name: "Craver",
    location: "Vancouver, BC",
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },
  {
    id: new CompanyId(),
    name: "University of British Columbia",
    location: "Vancouver, BC",
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },
  {
    id: new CompanyId(),
    name: "Homeward Trust Edmonton",
    location: "Edmonton, Alberta, Canada",
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  }
]

const experienceIds: WorkExperienceId[] = [
  new WorkExperienceId(),
  new WorkExperienceId(),
  new WorkExperienceId(),
  new WorkExperienceId(),
  new WorkExperienceId(),
  new WorkExperienceId()
]

const experiences: Experience[] = [
  // Brandmachine GmbH — Software Developer (May 2025 – Present)
  {
    id: experienceIds[0],
    title: "Software Developer",
    companyId: companies[0].id,
    locationType: WorkLocationType.Hybrid,
    isCurrent: true,
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-08-09"),
    bullets: [
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[0],
        orderIndex: 0,
        bulletPoint:
          "Led frontend development for a Shopify-integrated app using TypeScript, Vite, and Liquid, driving UI strategy for scalable page architecture.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[0],
        orderIndex: 1,
        bulletPoint:
          "Architected modular frontend and backend systems (GCP MCP, Vite, TypeScript), reducing feature rollout time by ~25% and enabling AI-agentic workflows.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[0],
        orderIndex: 2,
        bulletPoint:
          "Owned E2E delivery of model-management and AI-based product-shoot flows, supporting 50+ internal users.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[0],
        orderIndex: 3,
        bulletPoint:
          "Designed RESTful APIs and GCP-based backend components to support scalable, asynchronous processing of AI task flows.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      }
    ],
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },

  // Volunteer Backend Plugin Developer — Minecraft Server (Jul 2017 – Present)
  {
    id: experienceIds[1],
    title: "Volunteer Backend Plugin Developer",
    locationType: WorkLocationType.Remote,
    companyId: companies[1].id,
    isCurrent: true,
    startDate: new Date("2017-07-01"),
    endDate: new Date("2025-08-09"),
    bullets: [
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[1],
        orderIndex: 0,
        bulletPoint:
          "Engineered Java plugins using the Bukkit API for a Harry Potter–themed Minecraft server (duels, magical items, vote shops).",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[1],
        orderIndex: 1,
        bulletPoint:
          "Collaborated with game designers/admins to scope, build, and maintain immersive gameplay mechanics.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[1],
        orderIndex: 2,
        bulletPoint:
          "Led backend design of event-driven gameplay systems used by 300+ active players, improving responsiveness and extensibility.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      }
    ],
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },

  // Common Ground Social Network Inc. — Junior Software Developer (Apr 2024 – Apr 2025)
  {
    id: experienceIds[2],
    title: "Junior Software Developer",
    companyId: companies[2].id,
    locationType: WorkLocationType.Onsite,
    isCurrent: false,
    startDate: new Date("2024-04-01"),
    endDate: new Date("2025-04-01"),
    bullets: [
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[2],
        orderIndex: 0,
        bulletPoint:
          "Owned 10+ full-stack features including a real-time waitlist & notification system used by 300+ users.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[2],
        orderIndex: 1,
        bulletPoint:
          "Reduced backend latency by ~35% with AWS Lambda and CloudFront caching.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[2],
        orderIndex: 2,
        bulletPoint:
          "Maintained AWS infrastructure across 5+ microservices (Lambda, EC2, S3, Secrets Manager).",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[2],
        orderIndex: 3,
        bulletPoint:
          "Defined data models, API contracts, and system flows for notifications and waitlists.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[2],
        orderIndex: 4,
        bulletPoint:
          "Led backend integration and performance scaling across microservices during rapid product iteration.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      }
    ],
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },

  // Craver — Software Developer Co-op (Jan 2023 – Aug 2023)
  {
    id: experienceIds[3],
    title: "Software Developer Co-op",
    companyId: companies[3].id,
    locationType: WorkLocationType.Onsite,
    isCurrent: false,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-08-31"),
    bullets: [
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[3],
        orderIndex: 0,
        bulletPoint:
          "Maintained React Native apps used by 1,000+ restaurants.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[3],
        orderIndex: 1,
        bulletPoint:
          "Resolved dev-tooling bottlenecks, improving app generation speed by ~20%.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[3],
        orderIndex: 2,
        bulletPoint:
          "Presented product demos to 30+ stakeholders; contributed to 20+ peer reviews to raise code quality.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[3],
        orderIndex: 3,
        bulletPoint:
          "Iterated on user-facing features with designers & PMs, improving UX for client apps.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      }
    ],
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },

  // UBC — Computer Science Teaching Assistant (Jan 2022 – Dec 2024)
  {
    id: experienceIds[4],
    title: "Computer Science Teaching Assistant",
    companyId: companies[4].id,
    locationType: WorkLocationType.Onsite,
    isCurrent: false,
    startDate: new Date("2022-01-01"),
    endDate: new Date("2024-12-31"),
    bullets: [
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[4],
        orderIndex: 0,
        bulletPoint:
          "Led 50+ tutorials and graded 600+ assignments across three CS courses.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[4],
        orderIndex: 1,
        bulletPoint:
          "Mentored 300+ students in programming, debugging, and project planning.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      }
    ],
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  },
  {
    id: experienceIds[5],
    title: "Information Technology Intern",
    companyId: companies[5].id,
    locationType: WorkLocationType.Onsite,
    isCurrent: false,
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-08-31"),
    bullets: [
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[5],
        orderIndex: 0,
        bulletPoint:
          "Increased employee productivity by ~20% by building a responsive internal web page compatible with Internet Explorer (HTML/CSS/JavaScript).",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[5],
        orderIndex: 1,
        bulletPoint:
          "Optimized onboarding rate by ~70% with PowerShell automation that handled Azure account creation, access, and permissions.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[5],
        orderIndex: 2,
        bulletPoint:
          "Automated routine processes with Microsoft Power Platform; presented workflows to 20+ staff, freeing ~10% employee time.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      },
      {
        id: new ExperienceBulletId(),
        experienceId: experienceIds[5],
        orderIndex: 3,
        bulletPoint:
          "Improved cross-agency communication by deploying a Microsoft 365 solution with a 5-person team; boosted outreach team productivity by ~20%.",
        createdAt: new Date("2025-08-09T00:00:00Z"),
        updatedAt: new Date("2025-08-09T00:00:00Z")
      }
    ],
    createdAt: new Date("2025-08-09T00:00:00Z"),
    updatedAt: new Date("2025-08-09T00:00:00Z")
  }
]


const yyyymm = (d: Date) => d.toISOString().slice(0, 7);

const buildConversation = ({
  companies,
  experiences,
  userPrompt = "Return her work experiences from newest to oldest.",
  conversationTitle = "Her work experiences",
  conversationId = new ConversationId(),
  userMsgId = new ChatMessageId(),
  sysMsgId = new ChatMessageId()
}: {
  companies: readonly Company[];
  experiences: Experience[];
  userPrompt?: string;
  conversationTitle?: string;
  conversationId?: ConversationId ;
  userMsgId?: ChatMessageId;
  sysMsgId?: ChatMessageId;
}): Conversation => {
  const createdAt = new Date();

  experiences = experiences.sort((a, b) => {
    return b.startDate.getTime() - a.startDate.getTime();
  });

  // company lookup
  const companyById = new Map(companies.map(c => [c.id, c]));

  // sort experiences by start desc (adjust if you prefer)
  const exps = [...experiences].sort((a, b) =>
    b.startDate.getTime() - a.startDate.getTime()
  );

  // table rows: keep cells short (title, company, locationType, start, end, current)
  const tableRows: string[][] = exps.map(exp => {
    const co = companyById.get(exp.companyId);
    const title = exp.title;
    const company = co?.name ?? "";
    const loc = String(exp.locationType).toLowerCase(); // handles enum or string
    const start = yyyymm(exp.startDate);
    const end = exp.isCurrent ? "Present" : yyyymm(exp.endDate);
    const current = exp.isCurrent ? "Yes" : "No";
    return [title, company, loc, start, end, current];
  });

  // detailed bullet sections
  const detailBlocks: MessageBlock[] = exps.flatMap((exp, idx) => {
    const co = companyById.get(exp.companyId);
    const header: MessageBlock = {
      type: "heading",
      level: 3,
      text: `${co?.name ?? ""} — ${exp.title} (${yyyymm(exp.startDate)} — ${
        exp.isCurrent ? "Present" : yyyymm(exp.endDate)
      })`
    };

    const items = (exp.bullets ?? [])
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((b) => b.bulletPoint);

    const listBlock: MessageBlock = {
      type: "list",
      ordered: false, // set true if you want 1., 2., 3...
      items
    };

    const blocks: MessageBlock[] = items.length ? [header, listBlock] : [header];

    if (idx < exps.length - 1) {
      blocks.push({ type: "divider" });
    }

    return blocks;
  });

  const systemBlocks: MessageBlock[] = [
    { type: "heading", level: 2, text: "Her Work Experiences" },
    {
      type: "table",
      headers: ["Title", "Company", "Location Type", "Start", "End", "Current"],
      rows: tableRows
    },
    { type: "heading", level: 2, text: "Detailed Overview" },
    ...detailBlocks
  ];

  const userMsg: ChatMessage = {
    id: userMsgId,
    conversationId,
    role: MessageRole.User,
    messageIndex: 0,
    content: {
      blocks: [
        { type: "paragraph", text: userPrompt }
      ]
    },
    createdAt,
    updatedAt: createdAt
  };

  const systemMsg: ChatMessage = {
    id: sysMsgId,
    conversationId,
    role: MessageRole.System,
    messageIndex: 1,
    content: { blocks: systemBlocks },
    createdAt,
    updatedAt: createdAt
  };

  return {
    id: conversationId,
    title: conversationTitle,
    messages: [userMsg, systemMsg],
    createdAt,
    updatedAt: createdAt
  };
}

export const experienceConvo = buildConversation({
  companies,
  experiences,
});