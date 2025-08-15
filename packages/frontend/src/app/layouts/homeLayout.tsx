

import { Outlet } from "react-router-dom";
import Header from "./Header";

const HomeLayout = () => {

  return (
    <div className="w-full max-h-screen">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout;