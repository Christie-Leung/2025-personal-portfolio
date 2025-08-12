import { useParams } from "react-router-dom";
import { experienceConvo } from "./temp/data";
import { ChatMessageId } from "@2025-personal-portfolio/common/src/ids/ChatMessageId";
import { ChatId } from "@2025-personal-portfolio/common/src/ids";
import { useEffect, useRef, useState } from "react";
import { Chatbox } from "~/components";
import ChatComponent from "~/components/chat/ChatComponent";
import { createChatHook } from "~/generated/clients/chats/Chats.hooks";
import { ChatMessage } from "~/generated/models/ChatMessage";
import { MessageRole } from "~/generated/models/MessageRole";
import { StreamEvent } from "~/generated/models/StreamEvent";
import { getChatIdParam } from "~/hooks/params.hooks";
import config from "@2025-personal-portfolio/frontend-common/src/config";

type UseParams = {
  identifier: string;
}

const ChatPage = () => {
  const chatId = getChatIdParam();

  const cleanupRef = useRef<() => void | undefined>(undefined);

  const conversation = experienceConvo;

  const originalMsgs: ChatMessage[] = conversation.messages.map((message: ChatMessage, index: number) => {
    return { ...message, id: message.id };
  });

  const connectStream = (chatId: ChatId, onEvent: (e: StreamEvent) => void) => {
    const ev = new EventSource(`${config.apiHost}/chats/${chatId}/stream`);
    ev.onmessage = m => {
      try { onEvent(JSON.parse(m.data)); } catch {}
    };
    return () => ev.close();
  }

  const [messages, setMessages] = useState<ChatMessage[]>(originalMsgs);

  useEffect(() => {
    if (chatId) {
      const onEvent = (event: StreamEvent) => {
        setMessages(prevMessages => [...prevMessages, { 
          id: new ChatMessageId(),
          chatId,
          role: MessageRole.System,
          content: event.data,
          messageIndex: prevMessages.length,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
      };
      // Start the stream and store the cleanup function
      cleanupRef.current = connectStream(chatId, onEvent);
    }

    // This return function handles the cleanup
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [chatId]);

  return (
    <div className="w-full md:w-[65vw] lg:w-1/2 space-y-6 [&>*:last-child]:pb-[20vh]">
      {messages.map((message: ChatMessage, index: number) => (
        <ChatComponent key={index} chatMessage={message} />
      ))}
    </div>
  )
}

export default ChatPage;