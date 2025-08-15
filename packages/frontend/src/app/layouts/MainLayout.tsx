import { SidebarProvider } from "~/components/ui/sidebar"
import MenuDrawer from "./MenuDrawer"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <SidebarProvider>
      <MenuDrawer />
      <main className="min-h-screen w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default MainLayout;