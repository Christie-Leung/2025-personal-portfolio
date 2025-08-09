import { Search } from "@/components";
import ProjectApp from "./components/ProjectApp";
import type { Project } from "@/generated/models/Project";
import { ProjectId } from "@2025-personal-portfolio/common/src/ids/ProjectId";

const Projects: Project[] = [
  {
    id: new ProjectId("PJ12345678-1234-1234-1234-123456789012"),
    name: "Project One",
    slug: "project-one",
    description: "Description of project one.",
    link: "https://example.com/project-one",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png",
    banner: "https://images.unsplash.com/photo-1729575846511-f499d2e17d79?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGZvciUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-02T00:00:00Z")
  },
  {
    id: new ProjectId("PJ12345678-1234-1234-1234-123456789013"),
    name: "Project Two",
    slug: "project-two",
    description: "Description of project two.",
    link: "https://example.com/project-two",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png",
    banner: "https://images.unsplash.com/photo-1729575846511-f499d2e17d79?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGZvciUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date("2023-02-01T00:00:00Z"),
    updatedAt: new Date("2023-02-02T00:00:00Z")
  },
  {
    id: new ProjectId("PJ12345678-1234-1234-1234-123456789014"),
    name: "Project Three",
    slug: "project-three",
    description: "Description of project three.",
    link: "https://example.com/project-three",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png",
    banner: "https://images.unsplash.com/photo-1729575846511-f499d2e17d79?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGZvciUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date("2023-03-01T00:00:00Z"),
    updatedAt: new Date("2023-03-02T00:00:00Z")
  },
  {
    id: new ProjectId("PJ12345678-1234-1234-1234-123456789015"),
    name: "Project Four",
    slug: "project-four",
    description: "Description of project four.",
    link: "https://example.com/project-four",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png",
    banner: "https://images.unsplash.com/photo-1729575846511-f499d2e17d79?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGZvciUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date("2023-03-01T00:00:00Z"),
    updatedAt: new Date("2023-03-02T00:00:00Z")
  },
  {
    id: new ProjectId("PJ12345678-1234-1234-1234-123456789016"),
    name: "Project Five",
    slug: "project-five",
    description: "Description of project five.",
    link: "https://example.com/project-five",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png",
    banner: "https://images.unsplash.com/photo-1729575846511-f499d2e17d79?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGZvciUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date("2023-03-01T00:00:00Z"),
    updatedAt: new Date("2023-03-02T00:00:00Z")
  }
]

const ProjectsPage = () => {
  const multiplesOfFour = Math.ceil(Projects.length / 4);
  const orderedProjects = Projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const projectChunks = Array.from({ length: multiplesOfFour }, (_, i) =>
    orderedProjects.slice(i * 5, i * 5 + 5)
  );

  return (
    <div className="space-y-10 p-6">
      <div>
        <h4>Explore My Projects</h4>
      </div>
      <div className="flex flex-col w-full items-center justify-center px-4">
        <div className="w-full lg:w-1/2 space-y-10 px-6">
          <div className="flex flex-col w-full items-center text-center space-y-2">
            <h1 className="text-4xl">Projects</h1>
            <p>Discover and explore my projects that came to fruition from my curiosity and passion for building.</p>
          </div>
          <Search keyIndex="project" />
          <div className='grid gap-y-10'>
            {projectChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className='flex flex-row justify-between'>
                {chunk.map((project, index) => (
                  <ProjectApp key={index} project={project} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage;