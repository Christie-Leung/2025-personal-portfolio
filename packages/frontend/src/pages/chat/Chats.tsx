import { ChatMessageId } from "@2025-personal-portfolio/common/src/ids";
import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "~/app/context/chat";
import ChatComponent from "~/components/chat/ChatComponent";
import { Chat } from "~/generated/models/Chat";
import { ChatMessage } from "~/generated/models/ChatMessage";
import { MessageRole } from "~/generated/models/MessageRole";
import { getRandServiceUnavailMsg } from "~/utils/serviceUnavailMsg";

type ChatProps = {
  conversation: Chat;
}

const Chats = ({
  conversation,
}: ChatProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const { messages, setMessages, connectToStream, isLoading, isTimeout } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  console.log(conversation);

  useEffect(() => {
    connectToStream();
  }, [connectToStream]);

  console.log(hasInitialized);

  useEffect(() => {
    const initialMsgs: ChatMessage[] = conversation?.messages.map((message) => ({
        ...message,
        id: new ChatMessageId(),
      })) || [];

      setMessages(initialMsgs);
      setHasInitialized(true);
    
    }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesToDisplay = useMemo(() => {
    const displayMsgs = [...messages];
    const lastMessage = displayMsgs[displayMsgs.length - 1];

    if (lastMessage?.role !== MessageRole.User) return displayMsgs;

    // Add a temporary "thinking" message if the backend is processing
    if (isLoading) {
      const thinkingMessage: ChatMessage = {
        id: new ChatMessageId(),
        chatId: messages[0]?.chatId || "",
        role: MessageRole.System,
        content: { blocks: [{ type: "thinking", text: "Thinking..." }] },
        messageIndex: displayMsgs.length,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      displayMsgs.push(thinkingMessage);
    }
    
    // Add the "service unavailable" message
    if (isTimeout) {
      const unavailableMessage: ChatMessage = {
        id: new ChatMessageId(),
        chatId: messages[0]?.chatId || "",
        role: MessageRole.System,
        content: { blocks: [{ type: "paragraph", text: getRandServiceUnavailMsg() }] },
        messageIndex: displayMsgs.length,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      displayMsgs.push(unavailableMessage)
      messages.push(unavailableMessage);
    }
    
    return displayMsgs;
  }, [messages, isLoading, isTimeout]);

  return (
    <div className="w-full md:w-[65vw] lg:w-1/2 space-y-6 [&>*:last-child]:pb-[20vh]">
      {messagesToDisplay.map((message: ChatMessage, index: number) => (
        <ChatComponent key={index} chatMessage={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chats;