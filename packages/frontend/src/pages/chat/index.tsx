import { useChat } from "~/app/context/chat";
import Chats from "./Chats";
import { useConvo } from "~/app/context/chat/ConvoContext";


const ChatPage = () => {
  const { chatId} = useChat();
  const { conversations } = useConvo();

  return (
    <>
      {chatId && (
        <Chats
          conversation={conversations.find(c => c.id.isEqual(chatId))!}
        />
      )}
    </>
  )
}

export default ChatPage;

