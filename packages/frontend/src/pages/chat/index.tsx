import { useParams } from "react-router-dom";
import { experienceConvo } from "./temp/data";
import ChatComponent from "@/components/chat/ChatComponent";

type UseParams = {
  identifier: string;
}

const ChatPage = () => {

  const conversation = experienceConvo;

  return (
    <div className="w-full md:w-[65vw] lg:w-1/2 space-y-6 [&>*:last-child]:pb-[20vh]">
      {conversation.messages.map((message, index) => (
        <ChatComponent key={index} chatMessage={message} />
      ))}
    </div>
  )
}

export default ChatPage;