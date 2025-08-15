
import { ChatId } from "@2025-personal-portfolio/common/src/ids";
import { useNavigate } from "react-router-dom";
import { Chatbox } from "~/components";
import Thinking from "~/components/chat/blocks/Thinking";
import { Button } from "~/components/ui/button";
import { TextShimmer } from "~/components/ui/text-shimmer";

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
      <div className="flex w-[82vw] md:w-[50vw] items-center justify-center flex-col text-center space-y-10">
        <div className="space-y-1">
          <TextShimmer 
            as="h1"
          >
            Hi! I'm Christie.
          </TextShimmer>
          <h4>What do you want to learn about me?</h4>
          <div className="flex flex-row flex-wrap justify-center w-full py-2 space-x-2 space-y-2">
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
        <Chatbox />
      </div>
    </div>
  );
}

export default HomePage;