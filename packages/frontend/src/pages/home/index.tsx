import { Chatbox } from "@/components";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
    <div className="flex w-3/4 items-center justify-center flex-col text-center space-y-10">
      <div className="space-y-1">
        <h1>Welcome to Christie's Portfolio</h1>
        <h4>What do you want to learn about her?</h4>
        <div className="flex flex-row justify-evenly w-full py-2">
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
  );
}

export default HomePage;