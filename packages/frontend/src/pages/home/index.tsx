
import { useNavigate } from "react-router-dom";
import { Chatbox } from "~/components";
import { Button } from "~/components/ui/button";
import { workChatId } from "../chat/temp/data";
import ContactModal from "~/components/ContactModal";

const HomePage = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Work Experiences",
      action: () => navigate("/c/" + workChatId)
    },
    {
      label: "Projects",
      action: () => navigate("/projects")
    },
    {
      label: "Contact",
      action: () => {}
    }
  ]
  return (
    <div className="flex w-full h-[80vh] items-center justify-center pb-20">
      <div className="flex w-[82vw] md:w-[50vw] items-center justify-center flex-col text-center space-y-10">
        <div className="space-y-1">
          <h1>Hi! I'm Christie.</h1>
          <h4>What do you want to learn about me?</h4>
          <div className="flex flex-row flex-wrap justify-center w-full py-2 gap-2">
            {items.map((item, index) => {
              if (item.label === "Contact") {
                return (
                  <ContactModal key={index}>
                    <Button
                      roundedFull 
                      variant="secondary" 
                      size="lg" 
                    >
                      {item.label}
                    </Button>
                  </ContactModal>
                );
              }

              return (
                <Button 
                  key={index} 
                  roundedFull 
                  variant="secondary" 
                  size="lg" 
                  onClick={item.action}>
                  {item.label}
                </Button>
              )
            })}
          </div>
        </div>
        <Chatbox />
      </div>
    </div>
  );
}

export default HomePage;