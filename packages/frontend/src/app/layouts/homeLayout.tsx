

import { MoonIcon, SunIcon } from "lucide-react";
import { Outlet } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";
import { useTheme } from "~/provider";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";

const HomeLayout = () => {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider>
      <MenuDrawer />
      <main className="min-h-screen w-full">
        <Outlet />
      </main>
      <Button variant="outline" className="fixed top-2.5 right-4 z-1" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </SidebarProvider>
  )
}

export default HomeLayout;