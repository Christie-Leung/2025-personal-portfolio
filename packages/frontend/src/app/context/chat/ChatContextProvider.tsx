import { ReactNode, useEffect, useMemo, useState } from "react"
import { getChatIdParam } from "~/hooks/params.hooks";
import { ChatContext, ChatContextType } from "./ChatContext";
import { ChatMessage } from "~/generated/models/ChatMessage";
import { StreamEvent } from "~/generated/models/StreamEvent";
import config from "@2025-personal-portfolio/frontend-common/src/config";
import { ChatMessageId } from "@2025-personal-portfolio/common/src/ids";
import { MessageRole } from "~/generated/models/MessageRole";
import { postMessage } from "~/generated/clients/chats/Chats.client";
import { MessageBlocks } from "~/generated/models/MessageBlocks";

type ChatContextProviderProps = {
  children: ReactNode;
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
  const chatId = getChatIdParam();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const connectToStream = () => {
    if (isConnected) return;
    setIsConnected(true);

    let timeoutId: NodeJS.Timeout;

    const eventSource = new EventSource(`${config.apiHost}/chats/${chatId}/stream`, {
      withCredentials: true
    });
    
    eventSource.onmessage = m => {
      try {
        const event: StreamEvent = JSON.parse(m.data);
      } catch (e) {
        console.error("Failed to parse SSE message:", e);
      }
    };

    eventSource.addEventListener("discord_message", (me: MessageEvent) => {
      try {
        const event: MessageBlocks = JSON.parse(me.data);
        
        setMessages(prevMessages => {
          const newChatMessage: ChatMessage = {
            id: new ChatMessageId(), 
            chatId,
            role: MessageRole.System,
            content: event,
            messageIndex: prevMessages.length,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          return [...prevMessages, newChatMessage];
        });
      } catch (e) {
        console.error("Failed to parse SSE message:", e);
      }
    })

    eventSource.onopen = () => {
      console.log("SSE connected!");
      setIsConnected(true);
    };

    eventSource.onerror = (e) => {
      console.error("SSE connection error:", e);
      eventSource.close();
      setIsConnected(false);
    };

    timeoutId = setTimeout(() => {
      if (!isConnected) {
        setIsTimeout(true);
        setIsLoading(false);
        eventSource.close()
      }
    })

    return () => {
      console.log("Closing SSE connection...");
      eventSource.close();
      setIsConnected(false);
    };
  }

  const sendMessage = async (input: string) => {
    if (!chatId) return;

    const userMessage: ChatMessage = {
      id: new ChatMessageId(),
      chatId,
      role: MessageRole.User,
      content: {
        blocks: [{ type: "paragraph", text: input }]
      },
      messageIndex: messages.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      await postMessage({
        ids: { chatId },
        body: { content: input }
      });
      setIsLoading(true);
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  const context = useMemo<ChatContextType>(
    () => ({
      chatId,
      messages,
      setMessages,
      sendMessage,
      isConnected,
      isLoading,
      isTimeout,
      connectToStream,
    }),
    [
      chatId,
      messages,
      isConnected,
      isLoading,
      isTimeout,
    ]
  )

  return (
    <ChatContext.Provider value={context}>
      {children}
    </ChatContext.Provider>
  );
}