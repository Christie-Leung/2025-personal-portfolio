import { Outlet } from "react-router-dom";
import { Chatbox } from "~/components";
import { ChatContextProvider } from "../context/chat";

const ChatLayout = () => {

  return (
    <ChatContextProvider>
      <div className="w-full flex flex-col items-center">
        <div className={"px-6 h-[76vh] md:h-[83vh] lg:mt-0 first:pt-6  overflow-y-scroll pb-20 w-full flex justify-center"}>
          <Outlet />
        </div>
        <div className="sticky bottom-6 left-0 w-full flex items-center justify-center p-4">
          <div className="w-[85vw] md:w-[65vw] lg:w-1/2">
            <Chatbox />
          </div>
        </div>
      </div>
    </ChatContextProvider>
  );
};

export default ChatLayout;
