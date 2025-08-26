import { ArrowUp, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useCallback, useState } from "react";
import { useChat } from "~/app/context/chat";
import { useConvo } from "~/app/context/chat/ConvoContext";
import { ChatId, ChatMessageId } from "@2025-personal-portfolio/common/src/ids";
import { Chat } from "~/generated/models/Chat";
import { MessageRole } from "~/generated/models/MessageRole";
import { conversations } from "~/pages/chat/temp/data";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { getRandCatGif } from "~/utils/randCatGif";


const Chatbox = () => {
  const [input, setInput] = useState("");
  const { chatId, sendMessage, isLoading } = useChat();
  const [catgif, setCatGif] = useState("");
  const { setConversations } = useConvo();
  const navigate = useNavigate();

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    const text = input.trim();
    if (!text) return;

    setInput("");

    if (!chatId) {
        const newChatId = new ChatId();
        const newChat: Chat = {
          id: newChatId,
          messages: [{
            id: new ChatMessageId(),
            chatId: newChatId,
            role: MessageRole.User,
            content: { blocks: [{ type: "paragraph", text: input }] },
            messageIndex: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          }],
          createdAt: new Date(),
          updatedAt: new Date(),
          title: "New Chat"
        }
        setConversations!([...conversations, newChat]);
        navigate(`/c/${newChatId}`);
        return;
    }
    await sendMessage(text);
  }, [input, sendMessage]);

  return (
    <form onSubmit={handleSendMessage} className="flex flex-row rounded-full w-full h-full items-center justify-between border bg-background shadow-lg px-2 py-2 dark:bg-input dark:border-border/50">
      <Popover>
        <PopoverTrigger asChild>
          <Button roundedFull variant="ghost" className="ml-1" onClick={() => setCatGif(getRandCatGif())}>
            <PlusIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <>
            nothing here yet...
            <img src={catgif} alt="Random Cat" className="h-32 mt-2"/>
          </>
        </PopoverContent>
      </Popover>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex w-full p-2 border-none focus:outline-none" />
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button 
              type="submit"
              roundedFull 
              variant="default" 
              className="mr-1" 
              disabled={!input.trim() || isLoading}
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