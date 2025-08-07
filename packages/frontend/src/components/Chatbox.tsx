import { ArrowUp, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Chatbox = () => {
  return (
    <div className="flex flex-row rounded-full w-full h-full items-center justify-between border bg-background shadow-lg px-2 py-2 dark:bg-input/15 dark:border-input/20">
      <Button roundedFull variant="ghost" className="ml-1">
        <PlusIcon />
      </Button>
      <input type="text" placeholder="Ask a question..." className="flex w-full p-2 border-none focus:outline-none" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button roundedFull variant="default" className="mr-1">
            <ArrowUp />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default Chatbox;