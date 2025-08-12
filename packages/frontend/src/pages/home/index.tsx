
import { ChatId } from "@2025-personal-portfolio/common/src/ids";
import { useNavigate } from "react-router-dom";
import { Chatbox } from "~/components";
import { Button } from "~/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Work Experiences",
      action: () => navigate("/work-experiences")
    },
    {
      label: "Projects",
      action: () => navigate("/projects")
    },
    {
      label: "Contact",
      action: () => navigate("/contact")
    }
  ]
  return (
    <div className="flex w-full h-full items-center justify-center pb-20">
      <div className="flex w-[50vw] items-center justify-center flex-col text-center space-y-10">
        <div className="space-y-1">
          <h1>Hi! I'm Christie.</h1>
          <h4>What do you want to learn about me?</h4>
          <div className="flex flex-row justify-evenly w-full py-2 space-x-2">
            {items.map((item, index) => (
              <Button 
                key={index} 
                roundedFull 
                variant="secondary" 
                size="lg" 
                onClick={item.action}>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <Chatbox chatId={new ChatId()} />
      </div>
    </div>
  );
}

export default HomePage;