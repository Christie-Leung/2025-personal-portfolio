import { projects } from "~/pages/projects/temp/data";
import { preloadImages } from "~/utils/preloadImages";

export const projectsLoader = async () => {
  const imageUrls = projects.flatMap((project) => [project.appIcon, project.banner]);
  await preloadImages(imageUrls);
  return null;
};