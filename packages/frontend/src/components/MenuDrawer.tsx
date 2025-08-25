import { LuGithub, LuLinkedin, LuMenu } from "react-icons/lu";
import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { LayoutGridIcon, SearchIcon, SquarePenIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "~/lib/utils";
import { ChatId } from "@2025-personal-portfolio/common/src/ids";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import ContactModal from "~/components/ContactModal";
import SearchModal from "~/components/SearchModal";
import { useConvo } from "~/app/context/chat/ConvoContext";

const MenuDrawer = () => {
  const { open, openMobile, toggleSidebar } = useSidebar();
  const { conversations } = useConvo();
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

  const searchButton = () => (
      <SidebarMenuItem>
      <Tooltip>
        <TooltipTrigger asChild>
          <SearchModal>
            <Button 
              variant="ghost"
              className="w-full flex justify-start items-center"
            >
              <SearchIcon />
              <span className={cn(
                "transition duration-200 ease-in-out",
                drawerOpen ? "opacity-100" : "opacity-0"
              )}>Search Chat</span>
            </Button>
          </SearchModal>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          sideOffset={8}
          className={drawerOpen ? "hidden" : ""}
        >
          <p className="text-xs">Search Chat</p>
        </TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  )

  const chatButton = (chat: string, id: ChatId) => (
    <SidebarMenuItem>
      <Button 
        variant={isActive(id.toString()) ? "secondary" : "ghost"}
        className="w-full flex justify-start items-center p-2"
        onClick={() => {
          navigate(`/c/${id}`);
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
          {searchButton()}
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
                {conversations.map((conversation) => (
                  chatButton(conversation.title, conversation.id)
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <ContactModal>
                  <Button
                    variant="ghost"
                    className={cn("w-full flex justify-start p-1 items-center", {
                      "rounded-full hover:!bg-sidebar": !drawerOpen,
                    })}
                  >
                    <Avatar>
                      <AvatarImage src="/assets/avatar/christie.jpg" />
                      <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    {drawerOpen && <span>Christie Leung</span>}
                  </Button>
                </ContactModal>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8} className={drawerOpen ? "hidden" : ""}>
                <p className="text-xs">Contact me</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
          
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MenuDrawer;