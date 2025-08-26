
import { useEffect, type Key } from "react"
import { UrlButton } from "~/components"
import { BlockRenderer } from "~/components/chat/blocks"
import Tag from "~/components/Tag"
import { Button } from "~/components/ui/button"
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogClose, DialogContent, DialogDescription, DialogTitle } from "~/components/ui/dialog"
import { MessageBlock } from "~/generated/models/MessageBlock"
import { Project } from "~/generated/models/Project"

type ProjectProps = {
  project: Project
}

const ProjectApp = ({
  project
}: ProjectProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-1/3 md:w-1/5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
          <img src={project.appIcon} alt={project.name} className="w-16 h-16 rounded-md" />
          <p className="text-sm">{project.name}</p>
        </div>
      </DialogTrigger>
      <DialogContent
        bannerImg={project.banner}
        alt={project.name}
        className="max-h-[70vh] md:max-h-[90vh]"
      >
        <DialogHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2">
            <DialogTitle className="font-normal w-fit text-left">{project.name}</DialogTitle>
            <div className="flex flex-row space-x-2 w-fit">
             {project.link.map((link, index) => (
                <UrlButton 
                  key={index} 
                  socialUrl={link}
                  variant="outline"
                  size="icon"
                  coloured
                />
              ))}
            </div>
          </div>
          <div className="relative flex flex-wrap flex-grow gap-2">
            {project.tags && project.tags.slice(0, 3).map((tag: string, index: Key) => (
              <Tag key={index} className="flex-none"tag={tag} />
            ))}
          </div>
        </DialogHeader>
        <DialogDescription>
          {project.description.blocks.map((desc: MessageBlock, index: number) => (
            <BlockRenderer key={index} block={desc} />
          ))}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild className="relative">
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )
}

export default ProjectApp;