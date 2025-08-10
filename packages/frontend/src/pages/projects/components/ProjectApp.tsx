import { UrlButton } from "@/components"
import { BlockRenderer } from "@/components/chat/blocks"
import Tag from "@/components/Tag"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import type { MessageBlock } from "@/generated/models/MessageBlock"
import { Project } from "@/generated/models/Project"
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog"
import type { Key } from "react"

type ProjectProps = {
  project: Project
}

const ProjectApp = ({
  project
}: ProjectProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-1/5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
          <img src={project.appIcon} alt={project.name} className="w-16 h-16 rounded-md" />
          <p className="text-sm">{project.name}</p>
        </div>
      </DialogTrigger>
      <DialogContent
        bannerImg={project.banner}
        alt={project.name}
      >
        <DialogHeader>
          <div className="flex flex-row justify-between items-center">
            <h3 className="font-normal w-fit">{project.name}</h3>
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
          <div className="flex flex-row space-x-2">
            {project.tags && project.tags.slice(0, 3).map((tag: string, index: Key) => (
                <Tag key={index} tag={tag} />
              ))}
          </div>
        </DialogHeader>
        <DialogDescription>
          {project.description.map((desc: MessageBlock, index: number) => (
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