import { LuGithub, LuLinkedin, LuMenu } from "react-icons/lu";
import { Button } from "../../components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "../../components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip";
import { LayoutGridIcon, SearchIcon, SquarePenIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "~/lib/utils";
import { ChatId } from "@2025-personal-portfolio/common/src/ids";

const MenuDrawer = () => {
  const { open, setOpen } = useSidebar();
  const navigate = useNavigate();

  const isActive = (label: string) => {
    return window.location.pathname.toLocaleLowerCase().includes(label.toLowerCase());
  }

  const tooltipButton = (icon: React.ReactNode, label: string, onClick?: () => void) => (
    <SidebarMenuItem>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isActive(label) ? "secondary" : "ghost"}
            className="w-full flex justify-start items-center"
            onClick={onClick}
          >
            {icon}
            <span className={cn(
              "transition duration-200 ease-in-out",
              open ? "opacity-100" : "opacity-0"
            )}>{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          sideOffset={8}
          className={open ? "hidden" : ""}
        >
          <p className="text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  );

  const chatButton = (chat: string, id: ChatId) => (
    <SidebarMenuItem>
      <Button 
        variant={isActive(id.toString()) ? "secondary" : "ghost"}
        className="w-full flex justify-start items-center p-2"
        onClick={() => navigate(`/c/${id}`)}>
        {chat}
      </Button>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu className="pb-2">
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => setOpen(!open)}>
                  <LuMenu />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8} className={open ? "hidden" : ""}>
                <p className="text-xs">Open Sidebar</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {tooltipButton(<SquarePenIcon />, "New Chat", () => navigate('/'))}
          {tooltipButton(<SearchIcon />, "Search Chat")}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {tooltipButton(<LuGithub />, "Github", () => window.open("https://github.com/Christie-Leung"))}
              {tooltipButton(<LuLinkedin />, "Linkedin", () => window.open("https://www.linkedin.com/in/christie-leung-dev/"))}
              {tooltipButton(<LayoutGridIcon />, "Projects", () => navigate("/projects"))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {open && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm">Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chatButton("My Work Experiences", new ChatId())}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MenuDrawer;