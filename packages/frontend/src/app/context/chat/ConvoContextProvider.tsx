import { useEffect, useMemo, useState } from "react";
import { ConvoContext, ConvoContextType } from "./ConvoContext";
import { conversations } from "~/pages/chat/temp/data";
import { Chat } from "~/generated/models/Chat";

type ConvoContextProviderProps = {
  children: React.ReactNode;
}

export function ConvoContextProvider({ children }: ConvoContextProviderProps) {
  const expireThreshold = 30 * 60 * 1000 

  const [convos, setConvos] = useState<Chat[]>(() => {
    const now = Date.now()
    return conversations.filter(chat =>
      chat.title !== "New Chat" ||
      now - new Date(chat.createdAt).getTime() < expireThreshold
    )
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setConvos(prev =>
        prev.filter(chat =>
          chat.title !== "New Chat" ||
          now - new Date(chat.createdAt).getTime() < expireThreshold
        )
      )
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const context = useMemo<ConvoContextType>(
    () => ({
      conversations: convos,
      setConversations: setConvos
    }),
    [convos]
  )

  return (
    <ConvoContext.Provider value={context}>
      {children}
    </ConvoContext.Provider>
  )
}