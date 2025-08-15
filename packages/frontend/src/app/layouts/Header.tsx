import { MoonIcon, SunIcon } from "lucide-react"
import { useLocation } from "react-router-dom"
import { Button } from "~/components/ui/button"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { useIsMobile } from "~/hooks/use-mobile"
import { useTheme } from "~/provider"

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();

  let headerTitle = "Christie Leung"

  location.pathname.includes("/projects") && (headerTitle = "Explore Projects")

  return (
    <div className="z-10 sticky w-full flex items-center justify-between bg-background shadow-xs top-0 left-0 p-4 border-b border-border lg:border-none">
      <div className="flex flex-row space-x-2 items-center">
        {isMobile && <SidebarTrigger />}
        {location.pathname !== "/" && <h4>{headerTitle}</h4>}
      </div>
      <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </div>
  )
}

export default Header;