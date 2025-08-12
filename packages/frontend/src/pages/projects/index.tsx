import { Search } from "~/components";
import ProjectApp from "./components/ProjectApp";
import { projects } from "./temp/data";

const ProjectsPage = () => {
  const multiplesOfFour = Math.ceil(projects.length / 4);
  const orderedProjects = projects.sort((a, b) => {
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