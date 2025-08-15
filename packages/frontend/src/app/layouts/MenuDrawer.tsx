import { LuGithub, LuLinkedin, LuMenu } from "react-icons/lu";
import { Button } from "../../components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarTrigger, useSidebar } from "../../components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip";
import { LayoutGridIcon, SearchIcon, SquarePenIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "~/lib/utils";
import { ChatId } from "@2025-personal-portfolio/common/src/ids";
import { useIsMobile } from "~/hooks/use-mobile";

const MenuDrawer = () => {
  const { open, openMobile, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const drawerOpen = open || openMobile;


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
            onClick={() => {
              toggleSidebar();
              onClick?.();
            }}
          >
            {icon}
            <span className={cn(
              "transition duration-200 ease-in-out",
              drawerOpen ? "opacity-100" : "opacity-0"
            )}>{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          sideOffset={8}
          className={drawerOpen ? "hidden" : ""}
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
        onClick={() => {
          navigate(`/c/${id}`);
          toggleSidebar();
        }}>
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
                <SidebarTrigger />
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8} className={drawerOpen ? "hidden" : ""}>
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
        {drawerOpen && (
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