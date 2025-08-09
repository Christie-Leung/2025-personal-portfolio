import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import type { Project } from "@/generated/models/Project";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
  isOpen: boolean;
}

const ProjectModal = ({
  project,
  onClose,
  isOpen
}: ProjectModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <img src={project.appIcon} alt={project.name} className="w-16 h-16 rounded-md" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>test</p>
        </DialogHeader>
      </DialogContent>
      
    </Dialog>
  )
}