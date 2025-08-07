import { MenuDrawer } from "@/components";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useTheme } from "@/provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider>
      <MenuDrawer />
      <main className="flex items-center justify-center min-h-screen w-full pb-20">
        <Outlet />
      </main>
      <Button variant="outline" className="fixed top-4 right-4" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </SidebarProvider>
  )
}

export default HomeLayout;