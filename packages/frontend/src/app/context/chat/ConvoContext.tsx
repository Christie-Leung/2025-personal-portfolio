import { createContext, useContext } from "react"
import { Chat } from "~/generated/models/Chat"

const stub = (): never => {
  throw new Error(
    "Component not wrapped in <ConvoContextProvider>"
  )
}


export type ConvoContextType = {
  conversations: Chat[]
  setConversations?: (conversations: Chat[]) => void
}

export const ConvoContext = createContext<ConvoContextType>({
  conversations: [],
  setConversations: stub,
});

export function useConvo() {
  return useContext(ConvoContext);
}