import { UserChat } from "@/components";
import SystemChat from "@/components/chat/SystemChat";
import { useParams } from "react-router-dom";

type UseParams = {
  identifier: string;
}

const ChatPage = () => {
  const { identifier } = useParams<UseParams>() as UseParams;

  const messages = [
    {
      id: "CM123",
      role: "user",
      conversationId: "CV123",
      messageIndex: 1,
      createdAt: new Date().toISOString()
    },
    {
      "role": "system",

    }
  ]

  return (
    <div className="w-full lg:w-1/2 space-y-6 [&>*:last-child]:pb-[70vh]">
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      <UserChat />
      <SystemChat />
      
    </div>
  )
}

export default ChatPage;