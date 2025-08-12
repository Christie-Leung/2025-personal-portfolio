import { ChatId } from "@2025-personal-portfolio/common/src/ids";
import { useParams } from "react-router-dom";

export const getChatIdParam = () => {
  const { chatId } = useParams();
  console.log(chatId);
  
  if (!chatId) {
    throw new Error("Chat ID not found");
  }

  return new ChatId(chatId);
}