

import { Outlet } from "react-router-dom";
import Header from "./Header";

const HomeLayout = () => {

  return (
    <div className="w-full h-full max-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout;