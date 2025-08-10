import type { ChatMessage } from "@/generated/models/ChatMessage";
import { MessageRole } from "@/generated/models/MessageRole";
import { cn } from "@/lib/utils";
import { BlockRenderer } from "./blocks";

type ChatComponentProps = {
  chatMessage: ChatMessage;
}

const ChatComponent = ({
  chatMessage
}: ChatComponentProps) => {

  return (
    <div className={cn("w-full flex items-center text-wrap", {
      "justify-end": chatMessage.role === MessageRole.User,
      "justify-start": chatMessage.role === MessageRole.System
    })}>
      <div className={cn("py-2 px-4 rounded-lg", {
        "bg-primary-foreground w-fit max-w-[48vw] lg:max-w-[28vw]": chatMessage.role === MessageRole.User,
        "w-full": chatMessage.role === MessageRole.System,
      })}>
        {chatMessage.content.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </div>
    </div>
  )
}

export default ChatComponent;