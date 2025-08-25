import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { getChatIdParam } from "~/hooks/params.hooks";
import { ChatContext, ChatContextType } from "./ChatContext";
import { ChatMessage } from "~/generated/models/ChatMessage";
import { StreamEvent } from "~/generated/models/StreamEvent";
import config from "@2025-personal-portfolio/frontend-common/src/config";
import { ChatMessageId } from "@2025-personal-portfolio/common/src/ids";
import { MessageRole } from "~/generated/models/MessageRole";
import { postMessage } from "~/generated/clients/chats/Chats.client";
import { MessageBlocks } from "~/generated/models/MessageBlocks";
import toast from "react-hot-toast";
import { getRandCatGif } from "~/utils/RandCatGif";

type ChatContextProviderProps = {
  children: ReactNode;
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
  const chatId = getChatIdParam();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const esRef = useRef<EventSource | null>(null);
  const openRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connectToStream = () => {
    if (esRef.current) return;

    openRef.current = false;

    const eventSource = new EventSource(`${config.apiHost}/chats/${chatId}/stream`);
    esRef.current = eventSource;

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
          setIsLoading(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          return [...prevMessages, newChatMessage];
        });
      } catch (e) {
        console.error("Failed to parse SSE message:", e);
      }
    })

    eventSource.onopen = () => {
      console.log("SSE connected!");
      openRef.current = true;
      setIsConnected(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    eventSource.onerror = (e) => {
      console.error("SSE connection error:", e);
      setIsLoading(false);
      setIsTimeout(true);
      setIsConnected(false);
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };

    timeoutRef.current = setTimeout(() => {
      if (!openRef.current) {
        console.warn("SSE connect timeout — closing");
        setIsLoading(false);
        setIsConnected(false);
        setIsTimeout(true);
        if (esRef.current) {
          esRef.current.close();
          esRef.current = null;
        }
      }
    }, 60000);


    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (esRef.current) {
        console.log("Closing SSE connection...");
        esRef.current.close();
        esRef.current = null;
      }
      setIsLoading(false);
      setIsTimeout(true);
      setIsConnected(false);
    };
  }

  // optional: auto-connect on mount when chatId exists
  useEffect(() => {
    if (!chatId) return;
    const cleanup = connectToStream();
    return () => { cleanup?.(); };
  }, [chatId]);

  const catRelated = ["car", "cat", "catto"]

  const sendMessage = async (input: string) => {
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
      setIsTimeout(false);
      setIsLoading(true);
      setTimeout(() => {
        if (catRelated.includes(input.toLowerCase())) {
          setMessages(prevMessages => {
            const newChatMessage: ChatMessage = {
              id: new ChatMessageId(), 
              chatId,
              role: MessageRole.System,
              content: { blocks: [{ type: "image", url: getRandCatGif() }] },
              messageIndex: prevMessages.length,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            setIsLoading(false);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            return [...prevMessages, newChatMessage];
          });
        }
      }, 1000);
      await postMessage({
        ids: { chatId },
        body: { content: input }
      });
      setTimeout(() => {
        setIsLoading(false);
        setIsTimeout(true);
      }, 30000);
    } catch (error) {
      console.error("Failed to post message:", error);
    } finally {
      toast.error("This feature is still being developed.");
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