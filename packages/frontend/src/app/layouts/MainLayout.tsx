import { SidebarProvider } from "~/components/ui/sidebar"
import MenuDrawer from "../../components/MenuDrawer"
import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { ConvoContextProvider } from "../context/chat/ConvoContextProvider";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <ConvoContextProvider>
        <Toaster />
        <MenuDrawer />
        <main className="min-h-screen w-full">
          <Outlet />
        </main>
      </ConvoContextProvider>
    </SidebarProvider>
  )
}

export default MainLayout;