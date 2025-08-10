import { Chatbox } from "@/components";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {

  return (
    <div className="relative w-full max-h-screen h-full flex flex-col items-center">
      <div className={"px-6 h-[93vh] mt-14 lg:mt-0 first:pt-6 lg:first:pt-20 overflow-y-scroll pb-20 w-full flex justify-center"}>
        <Outlet />
      </div>
      <div className="absolute w-full bg-background shadow-xs top-0 left-0 p-4 px-6 border-b border-border lg:border-none">
        <h4>Christie Leung</h4>
      </div>
      <div className="sticky bottom-6 left-0 w-full flex items-center justify-center p-4">
        <div className="w-full md:w-[65vw] lg:w-1/2">
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
