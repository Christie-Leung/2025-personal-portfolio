import { ChatId, ChatMessageId } from "@2025-personal-portfolio/common/src/ids"
import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ChatMessage } from "~/generated/models/ChatMessage"
import { MessageRole } from "~/generated/models/MessageRole"
import { conversations } from "~/pages/chat/temp/data"
import { useConvo } from "./ConvoContext"
import { Chat } from "~/generated/models/Chat"

const stub = (): never => {
  throw new Error(
    "Component not wrapped in <ChatContextProvider>"
  )
}

export type ChatContextType = {
  chatId: ChatId | null,
  messages: ChatMessage[],
  setMessages: (messages: ChatMessage[]) => void,
  sendMessage: (input: string) => void,
  isConnected: boolean,
  connectToStream: () => void,
  isLoading: boolean,
  isTimeout: boolean,
}

export const ChatContext = createContext<ChatContextType>({
  chatId: null,
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