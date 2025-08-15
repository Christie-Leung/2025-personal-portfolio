import { ChatId } from "@2025-personal-portfolio/common/src/ids"
import { createContext, useContext } from "react"
import { ChatMessage } from "~/generated/models/ChatMessage"

const stub = (): never => {
  throw new Error(
    "Component not wrapped in <ChatContextProvider>"
  )
}

export type ChatContextType = {
  chatId: ChatId,
  messages: ChatMessage[],
  setMessages: (messages: ChatMessage[]) => void,
  sendMessage: (input: string) => void,
  isConnected: boolean,
  connectToStream: () => void,
  isLoading: boolean,
  isTimeout: boolean,
}

export const ChatContext = createContext<ChatContextType>({
  chatId: new ChatId(),
  messages: [],
  setMessages: () => {},
  sendMessage: stub,
  isConnected: false,
  connectToStream: stub,
  isLoading: false,
  isTimeout: false,
});

export function useChat() {
  return useContext(ChatContext);
}