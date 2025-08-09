import { ArrowUp, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";

const Chatbox = () => {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-row rounded-full w-full h-full items-center justify-between border bg-background shadow-lg px-2 py-2 dark:bg-input dark:border-border/50">
      <Button roundedFull variant="ghost" className="ml-1">
        <PlusIcon />
      </Button>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex w-full p-2 border-none focus:outline-none" />
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button 
              roundedFull 
              variant="default" 
              className="mr-1" 
              disabled={!input}
            >
              <ArrowUp />
            </Button>
          </div>
        </TooltipTrigger>
        {!input && (
          <TooltipContent side="top" sideOffset={8}>
            Message is empty
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
}

export default Chatbox;