import { ArrowUp, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useCallback, useState } from "react";
import { useChat } from "~/app/context/chat";


const Chatbox = () => {
  const [input, setInput] = useState("");
  const { sendMessage } = useChat();

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput("");
    console.log(sendMessage);
    await sendMessage(text);
  }, [input, sendMessage]);

  return (
    <form onSubmit={handleSendMessage} className="flex flex-row rounded-full w-full h-full items-center justify-between border bg-background shadow-lg px-2 py-2 dark:bg-input dark:border-border/50">
      <Button roundedFull variant="ghost" className="ml-1">
        <PlusIcon />
      </Button>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex w-full p-2 border-none focus:outline-none" />
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button 
              type="submit"
              roundedFull 
              variant="default" 
              className="mr-1" 
              disabled={!input.trim()}
            >
              <ArrowUp />
            </Button>
          </div>
        </TooltipTrigger>
        {!input.trim() && (
          <TooltipContent side="top" sideOffset={8}>
            Message is empty
          </TooltipContent>
        )}
      </Tooltip>
    </form>
  );
}

export default Chatbox;