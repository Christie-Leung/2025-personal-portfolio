import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Project } from "@/generated/models/Project"
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog"

type ProjectProps = {
  project: Project
}

const ProjectApp = ({
  project
}: ProjectProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
          <img src={project.appIcon} alt={project.name} className="w-16 h-16 rounded-md" />
          <p className="text-sm">{project.name}</p>
        </div>
      </DialogTrigger>
      <DialogContent 
        showCloseButton={false}
        bannerImg={project.banner}
        alt={project.name}
      >
        <DialogHeader>
          <h3 className="font-normal">{project.name}</h3>
        </DialogHeader>
        <DialogDescription>
          <p>{project.description}</p>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild className="relative">
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={() => window.open(project.link)}>
            View Project
          </Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )
}

export default ProjectApp;