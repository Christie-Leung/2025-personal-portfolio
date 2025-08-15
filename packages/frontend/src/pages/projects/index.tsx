import { Search } from "~/components";
import ProjectApp from "./components/ProjectApp";
import { projects } from "./temp/data";
import { useIsMobile } from "~/hooks/use-mobile";

const ProjectsPage = () => {
  const isMobile = useIsMobile();

  const multiple = isMobile ? 3 : 5;
  const multiples = Math.ceil(projects.length / multiple);
  const orderedProjects = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const projectChunks = Array.from({ length: multiples }, (_, i) =>
    orderedProjects.slice(i * multiple, i * multiple + multiple)
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col mt-10 w-full h-full items-center justify-center px-4 overflow-y-scroll">
        <div className="w-full md:w-3/4 lg:w-1/2 space-y-10 px-6 h-full">
          <div className="flex flex-col w-full items-center text-center space-y-2">
            <h1 className="text-4xl">Projects</h1>
            <p>Discover and explore my projects that came to fruition from my curiosity and passion for building.</p>
          </div>
          <Search keyIndex="project" />
          <div className='grid gap-y-10 pb-[20vh]'>
            {projectChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className='flex flex-row justify-start'>
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