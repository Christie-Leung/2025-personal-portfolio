import { experienceConvo } from "./temp/data";
import { ChatMessageId } from "@2025-personal-portfolio/common/src/ids/ChatMessageId";
import { useEffect, useMemo, useRef } from "react";
import ChatComponent from "~/components/chat/ChatComponent";
import { ChatMessage } from "~/generated/models/ChatMessage";
import { useChat } from "~/app/context/chat";
import { MessageRole } from "~/generated/models/MessageRole";
import Thinking from "~/components/chat/blocks/Thinking";


const ChatPage = () => {
  const { messages, setMessages, connectToStream, isLoading, isTimeout } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    connectToStream();
  }, [connectToStream]);


 useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
      const initialMsgs: ChatMessage[] = experienceConvo.messages.map((message) => ({
        ...message,
        id: new ChatMessageId(),
      }));

      setMessages(initialMsgs);
      hasInitialized.current = true;
    }
  }, [messages, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesToDisplay = useMemo(() => {
    const displayMsgs = [...messages];
    const lastMessage = displayMsgs[displayMsgs.length - 1];

    // Add a temporary "thinking" message if the backend is processing
    if (isLoading) {
      const thinkingMessage: ChatMessage = {
        id: new ChatMessageId(),
        chatId: messages[0]?.chatId || "",
        role: MessageRole.System,
        content: { blocks: [{ type: "paragraph", text: "Thinking..." }] },
        messageIndex: displayMsgs.length,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      displayMsgs.push(thinkingMessage);
    }
    
    const shouldShowServiceUnavailable = isTimeout && !isLoading && lastMessage?.role === MessageRole.User;
    
    // Add the "service unavailable" message
    if (shouldShowServiceUnavailable) {
      const unavailableMessage: ChatMessage = {
        id: new ChatMessageId(),
        chatId: messages[0]?.chatId || "",
        role: MessageRole.System,
        content: { blocks: [{ type: "paragraph", text: "The service is unavailable. Please try again later." }] },
        messageIndex: displayMsgs.length,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      displayMsgs.push(unavailableMessage);
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
  )
}

export default ChatPage;

